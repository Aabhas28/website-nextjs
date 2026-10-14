import MactusSite from "../../components/MactusSite";

export default async function SiteRoute({ params }) {
  const { slug } = await params;
  return <MactusSite route={slug.join("/")} />;
}
