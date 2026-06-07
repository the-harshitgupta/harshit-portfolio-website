import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for theharshitgupta.com, including lead forms, analytics, and email notifications.",
  alternates: { canonical: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <div className="wrap max-w-3xl">
        <div className="sec-tag">Privacy Policy</div>
        <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-muted">Last updated: June 8, 2026</p>

        <div className="prose-blog mt-10">
          <p>
            This website is operated by {site.name}. I use this site to share
            marketing resources, collect enquiries, and understand which content
            helps visitors most.
          </p>

          <h2>Information I collect</h2>
          <p>
            When you submit a contact form, checklist form, or workshop waitlist
            request, I may collect your name, email address, phone number,
            business details, selected service need, and message.
          </p>

          <h2>How I use the information</h2>
          <p>
            I use submitted information to respond to enquiries, send requested
            resources, follow up about relevant services or workshops, and improve
            the website experience.
          </p>

          <h2>Analytics</h2>
          <p>
            This website may use Google Analytics to understand page visits,
            traffic sources, and general visitor behavior. Analytics data is used
            in aggregate and does not give me direct access to your personal
            identity.
          </p>

          <h2>Email notifications</h2>
          <p>
            Form submissions may trigger an email notification through Resend so I
            can respond quickly. Resend processes email delivery data according to
            its own privacy and security practices.
          </p>

          <h2>Sharing of information</h2>
          <p>
            I do not sell your personal information. I may use trusted service
            providers such as hosting, analytics, database, and email tools to run
            this website and respond to enquiries.
          </p>

          <h2>Data retention</h2>
          <p>
            Enquiry data is kept only as long as needed for communication,
            business records, and reasonable follow-up. You can ask for your data
            to be deleted by emailing me.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy questions or deletion requests, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
