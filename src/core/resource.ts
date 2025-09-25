// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Retriever } from '../client';

export abstract class APIResource {
  protected _client: Retriever;

  constructor(client: Retriever) {
    this._client = client;
  }
}
