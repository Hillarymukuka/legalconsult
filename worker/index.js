/**
 * Cloudflare Worker - AI API Proxy
 * This worker acts as a proxy to handle CORS and call Cloudflare Workers AI
 */

const ACCOUNT_ID = 'b5c09dd43a24e9b610b32fcfc548d442';
const API_TOKEN = 'uvKUKIZ8vW7XZqP-0T4hgky8iyb0o_65tvnsOfSn';
const MODEL = '@cf/meta/llama-4-scout-17b-16e-instruct';

export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Parse the incoming request
      const body = await request.json();
      const { messages } = body;

      if (!messages || !Array.isArray(messages)) {
        return new Response(
          JSON.stringify({ error: 'Invalid request: messages array required' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Call Cloudflare Workers AI
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            messages,
            max_tokens: 2048,
            temperature: 0.7,
            top_p: 0.9,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || 'AI API request failed');
      }

      // Return the AI response with CORS headers
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: error.message || 'Internal server error',
          success: false
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};
