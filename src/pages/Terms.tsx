import SEO from "@/components/SEO";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background font-sans pt-32 pb-20">
      <SEO 
        title="Terms of Service" 
        description="Terms and Conditions for using ZAFTYS Logistics website and services." 
        canonical="/terms"
      />
      <div className="container mx-auto container-padding max-w-4xl">
        <h1 className="text-4xl font-heading font-bold mb-8 text-navy">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: November 29, 2025</p>

        <div className="prose prose-lg max-w-none text-muted-foreground">
          <p>
            Welcome to ZAFTYS Logistics. By accessing our website or using our services, you agree to be bound by these Terms of Service. 
            Please read them carefully.
          </p>

          <h3 className="text-navy font-bold mt-8 mb-4">1. Acceptance of Terms</h3>
          <p>
            By using our website, you represent that you are at least 18 years old and have the legal capacity to enter into these Terms. 
            If you disagree with any part of these terms, you may not use our services.
          </p>

          <h3 className="text-navy font-bold mt-8 mb-4">2. Services</h3>
          <p>
            ZAFTYS Logistics provides transportation and supply chain management services. All service agreements, including rates 
            and delivery schedules, are subject to specific contracts signed between ZAFTYS and the client. The information on this 
            website is for general informational purposes.
          </p>

          <h3 className="text-navy font-bold mt-8 mb-4">3. User Conduct</h3>
          <p>
            You agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Use the website for any unlawful purpose.</li>
            <li>Attempt to gain unauthorized access to our TSM™ platform or computer systems.</li>
            <li>Submit false or misleading information in quote requests or forms.</li>
            <li>Interfere with the proper working of the website.</li>
          </ul>

          <h3 className="text-navy font-bold mt-8 mb-4">4. Intellectual Property</h3>
          <p>
            All content on this website, including text, graphics, logos, and software (including ZAFTYS TSM™), is the property of 
            ZAFTYS Logistics or its licensors and is protected by Indian and international copyright laws.
          </p>

          <h3 className="text-navy font-bold mt-8 mb-4">5. Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, ZAFTYS Logistics shall not be liable for any indirect, incidental, special, 
            consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, 
            resulting from your use of the website.
          </p>

          <h3 className="text-navy font-bold mt-8 mb-4">6. Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. 
            Your continued use of the website constitutes acceptance of the updated Terms.
          </p>

          <h3 className="text-navy font-bold mt-8 mb-4">7. Contact Information</h3>
          <p>
            For legal inquiries, please contact us at:
          </p>
          <p className="font-semibold text-navy mt-2">
            ZAFTYS Logistics<br />
            World Trade Center, Kharadi<br />
            Pune, India - 411014<br />
            Email: legal@zaftys.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
