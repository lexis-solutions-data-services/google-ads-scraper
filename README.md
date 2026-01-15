# n8n-nodes-google-ads-scraper

An n8n community node that integrates the [Apify Google Ads Scraper](https://apify.com/lexis-solutions/google-ads-scraper) Actor directly into your n8n workflows.

This node enables you to extract advertising data from Google's Ads Transparency Center, providing access to comprehensive information about text, image, and video advertisements. Retrieve details such as headlines, descriptions, geographic targeting, impression metrics, and associated media assets.

[n8n](https://n8n.io/) is an open-source, [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform that empowers you to automate your business processes.

## Table of Contents

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Usage](#usage)
- [Input Parameters](#input-parameters)
- [Output](#output)

## Installation

Install this community node by following the official [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Operations

The **Apify Google Ads Scraper** node connects to Apify's cloud platform and executes the Google Ads Scraper Actor. Simply configure your input parameters—including start URLs, scraping limits, and optional settings—and the node will orchestrate the entire scraping process to gather Google Ads data.

### Capabilities

- **Seamless execution**: Automatically runs the Actor using your configured parameters
- **Progress tracking**: Monitors the scraping job in real-time and reports completion status
- **Data collection**: Retrieves all scraped results and formats them for use in your workflow
- **Robust error handling**: Delivers comprehensive error information when issues occur

The node manages the complete scraping lifecycle: initiating the Actor run, waiting for completion, and fetching all results automatically.

## Credentials

This node requires an Apify API Key for authentication.

**Obtaining your API Key**: Create an account at the [Apify Console](https://console.apify.com/) and retrieve your API token from the settings.

**Setup Steps**:

1. Visit [Apify Console](https://console.apify.com/)
2. Sign in or register for a new account
3. Open Settings → Integrations
4. Copy your API token
5. Add the token as credentials in the n8n node configuration

## Usage

**Getting Started**:

1. **Insert the node** into your n8n workflow canvas
2. **Authenticate** by providing your Apify API key credentials
3. **Configure inputs** specifying which Google Ads data you want to collect
4. **Execute** your workflow to begin data extraction

### Input Parameters

Comprehensive parameter documentation is available in the [Apify Google Ads Scraper Actor documentation](https://apify.com/lexis-solutions/google-ads-scraper).

#### Available Parameters

- **startUrls** (array, required): Collection of Google Transparency Center URLs to process
- **maxItems** (integer, optional): Limit on the number of ads to scrape (default: 100)
- **downloadMedia** (boolean, optional): Enable downloading media files to Key-Value Store (default: false)
- **cookies** (array, optional): Browser cookies in JSON format for accessing restricted content
- **proxyConfiguration** (object, optional): Proxy settings for location-based targeting

#### Example Input Configuration

```json
{
  "startUrls": [
    {
      "url": "https://adstransparency.google.com/advertiser/AR07117872862404280321?region=US&start-date=2025-05-22&end-date=2025-05-22"
    }
  ],
  "cookies": [],
  "maxItems": 40,
  "downloadMedia": false,
  "proxyConfiguration": {
    "useApifyProxy": true
  }
}
```

### Output

Results are returned as an array of ad objects. Each item represents a single advertisement with the following structure:

```json
{
  "id": "CR08100116008800354305",
  "advertiserId": "AR10303883279069085697",
  "creativeId": "CR08100116008800354305",
  "advertiserName": "My Jewellery B.V",
  "format": "IMAGE",
  "url": "https://adstransparency.google.com/advertiser/AR10303883279069085697/creative/CR08100116008800354305?region=DE&platform=YOUTUBE&start-date=2022-01-01&end-date=2024-12-31&format=IMAGE",
  "previewUrl": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT5cZ5keol3Qh0OGy8BxONGNpoc9OeRl771pz5cN4FnyOwhmGU",
  "previewStoreKey": "CR08100116008800354305_preview_0.jpg",
  "firstShownAt": "1710421161",
  "lastShownAt": "1758540064",
  "impressions": "600000",
  "shownCountries": ["Germany"],
  "countryStats": [
    {
      "code": "DE",
      "name": "Germany",
      "firstShownAt": "2024-03-14T00:00:00.000Z",
      "lastShownAt": "2025-09-22T00:00:00.000Z",
      "impressions": {
        "lowerBound": "500000",
        "upperBound": "600000"
      },
      "platformStats": [
        {
          "name": "YouTube",
          "code": "YOUTUBE",
          "impressions": {
            "lowerBound": "8000",
            "upperBound": "9000"
          }
        },
        {
          "name": "Google Shopping",
          "code": "SHOPPING",
          "impressions": {
            "lowerBound": "3000",
            "upperBound": "4000"
          }
        },
        {
          "name": "Google Search",
          "code": "SEARCH",
          "impressions": {
            "lowerBound": "450000",
            "upperBound": "500000"
          }
        }
      ]
    }
  ],
  "audienceSelections": [
    {
      "name": "Demographic info",
      "hasIncludedCriteria": true,
      "hasExcludedCriteria": false
    },
    {
      "name": "Geographic locations",
      "hasIncludedCriteria": true,
      "hasExcludedCriteria": true
    },
    {
      "name": "Contextual signals",
      "hasIncludedCriteria": true,
      "hasExcludedCriteria": true
    }
  ],
  "variants": [
    {
      "textContent": "Handykette mit Leopardemuster | My Jewellery - My Jewellery - Bigshopper",
      "images": [
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT5cZ5keol3Qh0OGy8BxONGNpoc9OeRl771pz5cN4FnyOwhmGU"
      ],
      "imageStoreKeys": ["CR08100116008800354305_v0_0.jpg"]
    }
  ],
  "originUrl": "https://adstransparency.google.com/advertiser/AR10303883279069085697?region=DE&platform=YOUTUBE&start-date=2022-01-01&end-date=2024-12-31&format=IMAGE"
}
```

## Data Fields Explained

The scraper extracts a wide range of advertising intelligence:

- **Advertiser details**: Company name and unique identifier
- **Creative information**: Ad ID, format type (TEXT/IMAGE/VIDEO), and URLs
- **Performance metrics**: Impression counts with upper and lower bounds
- **Geographic insights**: Countries where ads were displayed with per-country statistics
- **Platform breakdown**: Separate metrics for YouTube, Google Shopping, and Google Search
- **Audience targeting**: Detailed targeting criteria with inclusion/exclusion flags
- **Ad variants**: Multiple versions with text content and media links
- **Temporal data**: First and last shown timestamps

## Common Use Cases

- **Competitive intelligence**: Track and analyze competitor advertising strategies
- **Market analysis**: Research advertising trends and creative patterns
- **Investigative reporting**: Leverage transparency data for journalism
- **Agency operations**: Monitor client and competitor ad campaigns
- **Creative benchmarking**: Study ad formats, media, and messaging approaches
- **Regulatory compliance**: Verify ad transparency and adherence to regulations

## Important Considerations

- **Visibility factors**: The quantity of ads retrieved is influenced by authentication (cookies) and geographic location (IP address)
- **Cookie authentication**: Use cookies from an authenticated Google account to access age-restricted or personalized advertisements
- **Geographic targeting**: Configure proxy settings to retrieve ads specific to certain regions
- **Format support**: The scraper handles all three ad formats: text, image, and video

## Getting Help

For assistance, documentation, or feature requests:

- Consult the [Apify Google Ads Scraper Actor documentation](https://apify.com/lexis-solutions/google-ads-scraper)
- Explore the [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- Reach out to Lexis Solutions: [scraping@lexis.solutions](mailto:scraping@lexis.solutions)

## License

This community node is distributed as-is and adheres to n8n's community node licensing terms.
