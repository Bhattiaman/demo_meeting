export default function GoogleFormEmbed() {
    // Replace with your actual Google Form URL
    const formUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true";
    
    return (
      <div className="form-container">
        <iframe 
          src={formUrl}
          width="640" 
          height="800" 
          frameBorder="0" 
          marginHeight="0" 
          marginWidth="0"
        >
          Loading…
        </iframe>
      </div>
    )
  }