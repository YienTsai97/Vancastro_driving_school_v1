import "./simple-steps.css";

export const SimpleSteps = () => {
  return (
    <div className="simple-steps">
      <div className="pt-0 pb-[27px] md:pt-[60px] md:pb-[60px]">
        <h2>How It Works?</h2>
        <h2>Follow 3 Simple Steps</h2>
      </div>
      <div className="step-container bg-[#FFF5D8]">
        <h4 className="step text-[#FFF5D8]">
          Step 1
        </h4>
        <h3>Take the Knowledge Test</h3>
        <h6 className="w-auto max-w-[284px] md:max-w-[595px]">
          Prepare for and complete the Knowledge Test to assess your understanding of driving rules.
        </h6>
        <p>
          Need translation? <span>
            <a
              href="https://www.facebook.com/ICBCKnowledgeTestMaterial/"
              target="_blank"
              className="underline text-[#FFBB00] hover:text-[#32a2ed] active:text-[#32a2ed]">
              Click here
            </a>
          </span> to connect with a partner for language support.
        </p>
      </div>
      <div className="step-container  bg-[#FFDF94]">
        <h4 className="step text-[#FFDF94]">
          Step 2
        </h4>
        <h3>Phone Consultation</h3>
        <h6 className="w-auto  max-w-[300px] md:max-w-[595px]">
          Discuss available plans tailored to your needs (e.g. changing licenses or starting as a beginner)
        </h6>
      </div>
      <div className="step-container bg-[#FFCE47]">
        <h4 className="step text-[#FFCE47]">
          Step 3
        </h4>
        <h3>Road Test Preparation</h3>
        <div>
          <h5>Convenient Pickup & Drop-off</h5>
          <h6 className="width-full">
            We'll pick you up and drop you off at the meeting point.
          </h6>
        </div>
        <div>
          <h5>Meet at a Designated Location</h5>
          <h6>Typically at a SkyTrain station.</h6>
        </div>
        <div>
          <h5>Road Test Scheduling</h5>
          <h6>We'll help you schedule your Road Test.</h6>
        </div>
      </div>
    </div>
  )
}
