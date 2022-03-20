/**
 * This module exports a couple of objects with useful promise-based
 * functions for interacting with the python API
 */
/**
 * fetch() is a promise-based API for making http calls. The first argument
 * is a URL, and the second argument are options that control basically everything
 * else about the request (method, body, headers, etc).
 *
 * This API is standard in modern browsers, and coming to node in version 17, but not
 * yet available in LTS (stable) versions.
 */
import fetch from "node-fetch";

/**
 * Error class for general API failures.
 * @class
 */
export class APIError extends Error {
  /**
   * @param {Response} response
   */
  constructor(response) {
    super(
      `Error interacting with data source. URL: ${response.url}. Code: ${response.status}`
    );

    /**
     * @property
     * @type { Response }
     */
    this.response = response;
    /**
     * @property
     * @type { number }
     */
    this.status = response.status;
    /**
     * @property
     * @type { string }
     */
    this.url = response.url;
  }
}

/**
 * @class CrudService
 * Service class for consuming the python API
 * * Create
 * * Read
 * * Update
 * * Delete
 */
class CrudService {
  /**
   * @param { string } baseRoute - The base route for this service, eg `recipes`. All requests
   *  from this service will be somewhere under the base route. This should usually be the list
   *  route for the model this service is intended to manage.
   * @param { string } [apiBase] - The URL base for the API. Defaults to `http://localhost:5000`
   *
   * Side note! In these `jsdoc` blocks, if you see `@param { type } [paramName]`, the square
   * brackets indicate that a parameter is optional.
   */
  constructor(baseRoute, apiBase = "http://localhost:5000/") {
    this.baseRoute = baseRoute;
    this.apiBase = apiBase;
  }

  getListRoute() {
    return this.apiBase + this.baseRoute;
  }

  getDetailRoute(id) {
    return this.apiBase + this.baseRoute + "/" + id;
  }

  /**
   * Perform an HTTP GET on the `baseRoute`.
   * @return { object[] } The API response body.
   */
  getAll() {
    return fetch(this.getListRoute(), {
      method: "GET",
    }).then((response) => {
      /**
       * Errors can be handled super easily in promise-land. We just `throw`
       * from a `.then` block, and the next `.catch` block down the line will
       * catch the error. This means we don't have to handle errors explicitly
       * in here ourselves, and can offload that responsibility to the consuming
       * code. We just provide a simple `APIError` class to help out.
       */
      if (!response.ok) {
        throw new APIError(response);
      }
      /**
       * response.json() returns a promise. We don't care though, bam, boom,
       * promise chaining! Our consumer just gets the result value.
       */
      return response.json();
    });
  }

  /**
   * Fetch a single model by its id.
   * @param { number } id - The id of the model
   * @returns { object } - The newly fetched model
   */
  getById(id) {
    return fetch(this.getDetailRoute(id), {
      method: "GET",
    }).then((response) => {
      if (!response.ok) {
        throw new APIError(response);
      }
      return response.json();
    });
  }
}

export const recipeService = new CrudService("recipes");
export const ingredientService = new CrudService("ingredients");
