import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import { company } from "@/data/company";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Prasanth Associates website, including its cost calculators, building planner and quote forms.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: pageOpenGraph(
    "/terms",
    "Terms of Service | Prasanth Associates",
    "The terms that apply when you use the Prasanth Associates website."
  ),
};

const LAST_UPDATED = "7 October 2026";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <p>
            These terms apply to your use of prasanthassociates.com, run by {company.name}, Coimbatore, Tamil
            Nadu. By using the website you accept them. If you do not agree, please do not use the site.
          </p>
          <p>
            These terms cover the website only. Any construction, design, valuation or advisory work we carry
            out for you is governed by the separate written agreement we sign with you.
          </p>
        </>
      }
      sections={[
        {
          heading: "Estimates, calculators and the building planner",
          body: (
            <>
              <p>
                The cost calculator, rate cards, building planner and any figures shown on this website are
                indicative only. They are meant to help you plan, not to serve as an offer or a quotation.
              </p>
              <p>
                Actual costs depend on your site, drawings, specifications, approvals and market prices at the
                time. A price is binding only when it is set out in a written quotation or Bill of Quantities
                signed by {company.name}.
              </p>
            </>
          ),
        },
        {
          heading: "Information on this website",
          body: (
            <p>
              We work to keep the information on this site accurate and up to date, but we do not guarantee
              that it is complete or free of errors. Project photos and descriptions show past work and are not
              a promise that a future project will look or cost the same. Content is general information, not
              professional advice for your specific situation.
            </p>
          ),
        },
        {
          heading: "Your submissions",
          body: (
            <>
              <p>When you submit a form or upload files, you confirm that:</p>
              <ul>
                <li>The information you provide is accurate</li>
                <li>You have the right to share any drawings, photos or documents you upload</li>
                <li>Uploads do not contain anything unlawful, harmful or malicious</li>
              </ul>
              <p>
                You keep ownership of what you upload. You allow us to use it to respond to your enquiry and
                prepare quotes or designs for you. How we handle personal information is explained in our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
            </>
          ),
        },
        {
          heading: "Acceptable use",
          body: (
            <>
              <p>You agree not to:</p>
              <ul>
                <li>Use the site for anything unlawful or fraudulent</li>
                <li>Send spam or automated submissions through our forms</li>
                <li>Try to break into, overload or disrupt the website or its systems</li>
                <li>Copy or scrape the site&apos;s content in bulk</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              The text, photos, designs, drawings, logos and other content on this website belong to{" "}
              {company.name} or are used with permission. You may view and share pages for personal,
              non-commercial use. You may not copy, reproduce or reuse our designs or content for any other
              purpose without our written permission.
            </p>
          ),
        },
        {
          heading: "Third-party links and services",
          body: (
            <p>
              The site links to and embeds services run by others, such as Google Maps, WhatsApp and social
              media. We are not responsible for their content or how they handle your information. Their own
              terms and policies apply.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              The website is provided &quot;as is&quot;. To the extent the law allows, {company.name} is not
              liable for any loss or damage arising from your use of the website, from relying on its content
              or estimates, or from the site being unavailable. Nothing in these terms limits liability that
              cannot be limited under Indian law.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of India. Any dispute relating to the website is subject to
              the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu.
            </p>
          ),
        },
        {
          heading: "Changes to these terms",
          body: (
            <p>
              We may update these terms from time to time. The date at the top of this page shows when they
              were last changed. Continuing to use the website after a change means you accept the new terms.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms? Email <a href={`mailto:${company.email}`}>{company.email}</a> or use
              our <Link href="/contact">contact page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
