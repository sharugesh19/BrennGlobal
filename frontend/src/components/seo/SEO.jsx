import { Helmet } from "react-helmet-async";

const SITE_NAME = "Brenn Global";
const DEFAULT_DESCRIPTION =
  "Brenn Global designs precision-engineered kitchen tools for professionals and home bakers.";
const SITE_URL = "https://www.brennglobal.com";

const SEO = ({ title, description = DEFAULT_DESCRIPTION, path = "/", image, schema }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Precision Kitchen Tools`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default SEO;
