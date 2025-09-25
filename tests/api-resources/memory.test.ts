// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Retriever from 'retriever';

const client = new Retriever({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memory', () => {
  // Prism tests are disabled
  test.skip('searchMemories: only required params', async () => {
    const responsePromise = client.memory.searchMemories({
      query: 'user preferences for outdoor activities',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('searchMemories: required and optional params', async () => {
    const response = await client.memory.searchMemories({
      query: 'user preferences for outdoor activities',
      limit: 1,
      mode: 'semantic',
      userId: 'userId',
    });
  });

  // Prism tests are disabled
  test.skip('storeConversation: only required params', async () => {
    const responsePromise = client.memory.storeConversation({
      content: [
        { content: 'I love hiking and prefer mountain trails over coastal walks.', role: 'user' },
        {
          content: "That's great! Mountain trails offer beautiful scenery and fresh air.",
          role: 'assistant',
        },
      ],
      userId: 'user_12345',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('storeConversation: required and optional params', async () => {
    const response = await client.memory.storeConversation({
      content: [
        { content: 'I love hiking and prefer mountain trails over coastal walks.', role: 'user' },
        {
          content: "That's great! Mountain trails offer beautiful scenery and fresh air.",
          role: 'assistant',
        },
      ],
      userId: 'user_12345',
      sessionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
