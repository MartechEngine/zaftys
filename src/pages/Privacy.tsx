import SEO from "@/components/SEO";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background font-sans pt-32 pb-20">
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for ZAFTYS Logistics. Learn how we collect, use, and protect your personal data." 
        canonical="/privacy"
      />
      <div className="container mx-auto container-padding max-w-4xl">
        <h1 className="text-4xl font-heading font-bold mb-8 text-navy">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: November 29, 2025</p>

        <div className="prose prose-lg max-w-none text-muted-foreground">
          <p>
            At ZAFTYS Logistics ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or use our logistics services.
          </p>

          <h3 className="text-navy font-bold mt-8 mb-4">1. Information We Collect</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Request a quote or contact us via forms.</li>
            <li>Register as a fleet partner.</li>
            <li>Apply for a job.</li>
            <li>Sign up for our newsletter.</li>
          </ul>
          <p>
            This information may include your name, email address, phone number, company name, and fleet details.
          </p>

          <h3 className="text-navy font-bold mt-8 mb-4">2. How We Use Your Information</h3>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide and manage our logistics services.</li>
            <li>Process your quotes and orders.</li>
            <li>Communicate with you regarding updates, offers, and customer service.</li>
            <li>Improve our website and TSM™ platform functionality.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h3 className="text-navy font-bold mt-8 mb-4">3. Sharing Your Information</h3>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your data with:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Service providers and subcontractors who assist in our operations (e.g., cloud hosting, email services).</li>
            <li>Legal authorities if required by law or to protect our rights.</li>
          </ul>

          <h3 className="text-navy font-bold mt-8 mb-4">4. Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, 
            alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>

          <h3 className="text-navy font-bold mt-8 mb-4">5. Contact Us</h3>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="font-semibold text-navy mt-2">
            ZAFTYS Logistics<br />
            World Trade Center, Kharadi<br />
            Pune, India - 411014<br />
            Email: contact@zaftys.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
