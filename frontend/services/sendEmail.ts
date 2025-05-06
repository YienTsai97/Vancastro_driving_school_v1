import sgMail from "@sendgrid/mail";

export const sendEmail = async (
  to: string,
  templateName: Templates,
  dynamicTemplateData: Record<string, string>
): Promise<boolean> => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL!,
    templateId: templates[templateName],
    dynamicTemplateData,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Templates
export type Templates = "test1" | "test2";

const templates = {
  test1: "first template id",
  test2: "other template id",
}
