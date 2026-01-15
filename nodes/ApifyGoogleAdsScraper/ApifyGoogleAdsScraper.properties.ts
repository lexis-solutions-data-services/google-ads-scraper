import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

// Helper functions for parameter extraction
function getFixedCollectionParam(
  context: IExecuteFunctions,
  paramName: string,
  itemIndex: number,
  optionName: string,
  transformType: 'passthrough' | 'mapValues',
): Record<string, any> {
  const param = context.getNodeParameter(paramName, itemIndex, {}) as { [key: string]: any[] };
  if (!param?.[optionName]?.length) return {};

  let result = param[optionName];
  if (transformType === 'mapValues') {
    result = result.map((item: any) => item.value);
  }
  return { [paramName]: result };
}

function getJsonParam(context: IExecuteFunctions, paramName: string, itemIndex: number): Record<string, any> {
  try {
    const rawValue = context.getNodeParameter(paramName, itemIndex);
    if (typeof rawValue === 'string' && rawValue.trim() === '') {
      return {};
    }
    return { [paramName]: typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue };
  } catch (error) {
    throw new Error(`Invalid JSON in parameter "${paramName}": ${(error as Error).message}`);
  }
}

export function buildActorInput(
  context: IExecuteFunctions,
  itemIndex: number,
  defaultInput: Record<string, any>,
): Record<string, any> {
  return {
    ...defaultInput,
    // Start URLs (startUrls)
    ...getFixedCollectionParam(context, 'startUrls', itemIndex, 'items', 'passthrough'),
    // Cookies (not required) (cookies)
    ...getJsonParam(context, 'cookies', itemIndex),
    // Max Items (maxItems)
    maxItems: context.getNodeParameter('maxItems', itemIndex),
    // Proxy Configuration (proxyConfiguration)
    ...getJsonParam(context, 'proxyConfiguration', itemIndex),
    // Download media to Key-Value Store (downloadMedia)
    downloadMedia: context.getNodeParameter('downloadMedia', itemIndex),
  };
}

const authenticationProperties: INodeProperties[] = [
  {
    displayName: 'Authentication',
    name: 'authentication',
    type: 'options',
    options: [
      {
        name: 'API Key',
        value: 'apifyApi',
      },
      {
        name: 'OAuth2',
        value: 'apifyOAuth2Api',
      },
    ],
    default: 'apifyApi',
    description: 'Choose which authentication method to use',
  },
];

export const actorProperties: INodeProperties[] = [
  {
    "displayName": "Start URLs",
    "name": "startUrls",
    "description": "Google Ads Transparency Center URLs",
    "required": true,
    "default": {},
    "type": "fixedCollection",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "items",
        "displayName": "items",
        "values": [
          {
            "displayName": "item",
            "name": "url",
            "type": "string",
            "default": ""
          }
        ]
      }
    ]
  },
  {
    "displayName": "Cookies (not required)",
    "name": "cookies",
    "description": "1. Install the Cookie-Editor Chrome extension.\n2. Go to https://adstransparency.google.com and log in.\n3. Open the Cookie-Editor extension and export cookies as JSON.\n4. Paste the exported cookie contents here.",
    "required": false,
    "default": "[]",
    "type": "json"
  },
  {
    "displayName": "Max Items",
    "name": "maxItems",
    "description": "Maximum number of items to scrape",
    "required": false,
    "default": 100,
    "type": "number",
    "typeOptions": {}
  },
  {
    "displayName": "Proxy Configuration",
    "name": "proxyConfiguration",
    "description": "Your proxy configuration from Apify",
    "required": false,
    "default": "{\"useApifyProxy\":true,\"apifyProxyGroups\":[]}",
    "type": "json"
  },
  {
    "displayName": "Download media to Key-Value Store",
    "name": "downloadMedia",
    "description": "If true, downloads preview and variant images/videos into KV store and returns stored keys.",
    "required": false,
    "default": false,
    "type": "boolean"
  }
];

export const properties: INodeProperties[] = [...actorProperties, ...authenticationProperties];