import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, pageOpenGraph } from "@/lib/seo";
import { company } from "@/data/company";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Prasanth Associates collects, uses and protects the personal information you share through our website, forms and file uploads.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: pageOpenGraph(
    "/privacy",
    "Privacy Policy | Prasanth Associates",
    "How Prasanth Associates collects, uses and protects the personal information you share through our website."
  ),
};

const LAST_UPDATED = "7 October 2026";

export default function PrivacyPage() {
  const hq = company.offices[0];
  const phoneHref = `tel:${company.phone.replace(/\s/g, "")}`;

  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <p>
            This policy explains what personal information {company.name} (&quot;we&quot;, &quot;us&quot;)
            collects through prasanthassociates.com, why we collect it, and what we do with it. It is written
            to comply with the Information Technology Act, 2000 and the Digital Personal Data Protection Act,
            2023.
          </p>
          <p>By using our website or submitting a form, you agree to the practices described here.</p>
        </>
      }
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>We only collect what you choose to give us through our forms:</p>
              <ul>
                <li>Your name, phone number and email address</li>
                <li>Project details: type of project, location, plot size, budget, timeline and any message you write</li>
                <li>Building planner selections, such as floors, rooms and parking</li>
                <li>Files you upload, such as sketches, floor plans, site photos or documents</li>
              </ul>
              <p>
                When you use the site, our servers also record basic technical information such as your IP
                address, which we use only to block spam and abuse of our forms.
              </p>
              <p>We do not knowingly collect information from anyone under 18.</p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <ul>
              <li>To reply to your enquiry and prepare quotes, estimates and designs</li>
              <li>To contact you by phone, email or WhatsApp about your project</li>
              <li>To carry out work you engage us for</li>
              <li>To keep records required by law, such as tax and accounting records</li>
              <li>To protect our website and forms from misuse</li>
            </ul>
          ),
        },
        {
          heading: "Where your information is stored",
          body: (
            <p>
              Form submissions are stored in Google Sheets and uploaded files in Google Drive, in accounts
              controlled by {company.name}. Google processes this data on our behalf under its own security
              and privacy terms. Access is limited to our staff who need it to handle your enquiry or project.
            </p>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <>
              <p>We do not sell or rent your personal information. We share it only:</p>
              <ul>
                <li>With service providers who run our website and storage (hosting, Google Workspace)</li>
                <li>
                  With consultants, surveyors or contractors working on your project, and only the details
                  they need
                </li>
                <li>With government authorities or banks when you ask us to, for example for plan approvals or valuation reports</li>
                <li>When required by law or a court order</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Cookies and third-party services",
          body: (
            <>
              <p>
                Our website does not use advertising or tracking cookies. Some pages include services from
                other companies, which have their own privacy policies:
              </p>
              <ul>
                <li>Google Maps, embedded on our contact and location pages, may set its own cookies</li>
                <li>The WhatsApp button opens WhatsApp, which is run by Meta</li>
                <li>Links to our Instagram, Facebook and LinkedIn pages</li>
              </ul>
            </>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep enquiry details for as long as we need them to respond to you and to follow up on any
              project that results. If you become a client, we keep project records for as long as the law
              requires. When information is no longer needed, we delete it.
            </p>
          ),
        },
        {
          heading: "Security",
          body: (
            <p>
              Our website uses HTTPS encryption, our forms are protected against automated abuse, and access to
              stored submissions is restricted. No method of transmission or storage is completely secure, but
              we take reasonable steps to protect your information.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <>
              <p>You can ask us to:</p>
              <ul>
                <li>Tell you what personal information we hold about you</li>
                <li>Correct or update it</li>
                <li>Delete it, unless we must keep it by law</li>
                <li>Stop contacting you</li>
              </ul>
              <p>
                Email us at <a href={`mailto:${company.email}`}>{company.email}</a> and we will respond within
                30 days.
              </p>
            </>
          ),
        },
        {
          heading: "Grievances and contact",
          body: (
            <>
              <p>For any question or complaint about this policy or your personal information, contact us:</p>
              <ul>
                <li>
                  Email: <a href={`mailto:${company.email}`}>{company.email}</a>
                </li>
                <li>
                  Phone: <a href={phoneHref}>{company.phone}</a>
                </li>
                <li>
                  Post: {company.name}, {hq.street}, {hq.city}, {hq.state} {hq.pincode}
                </li>
              </ul>
              <p>
                You can also reach us through our <Link href="/contact">contact page</Link>.
              </p>
            </>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              We may update this policy from time to time. The date at the top of this page shows when it was
              last changed.
            </p>
          ),
        },
      ]}
    />
  );
}
