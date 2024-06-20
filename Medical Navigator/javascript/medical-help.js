const searchInput = document.getElementById("search-input");
const articleContainer = document.getElementById("article-container");
const articleDetails = document.getElementById("article-details");
const backButton = document.createElement("div");
backButton.classList.add("back-button");
backButton.textContent = "Go back";

const articles = [
  {
    "title": "Normal Vital Signs",
    "content": `
      <strong>Normal Vital Signs:</strong></br>
      - Heart Rate (Pulse): 60-100 beats per minute</br>
      - Respiratory Rate: 12-20 breaths per minute</br>
      - Blood Pressure: 90/60 mmHg to 120/80 mmHg</br>
      - Temperature: 97.8°F to 99.1°F | 36.5°C to 37.3°C</br></br>
  
      <strong>What is a Normal Vital Sign?</strong> 
      Vital signs are measurements of the body's basic functions. They are used to assess the general physical health of a person. Monitoring vital signs provides essential information about a person's physiological state and helps in detecting any abnormalities or changes in health status.</br></br>
  
      <strong>Treatment:</strong> </br></br>
      If there are concerns about abnormal vital signs or health conditions, seek appropriate medical assistance. Medical interventions may include:</br></br>
      - To increase heart rate: Administer adrenaline via intravenous (IV) route, or orally, under medical supervision.</br></br>
      - To decrease heart rate: Administer beta-blockers, such as Propranolol or Metoprolol, orally, intravenously, or by other routes as prescribed by a healthcare professional.</br></br>
      - To address respiratory distress: Provide oxygen therapy by placing a mask over the patient's nose and mouth, delivering oxygen at a flow rate determined by the healthcare provider based on the patient's needs.</br></br>
      - To manage blood pressure: Administer medications such as vasopressors or antihypertensives as per medical guidance. These medications are typically taken orally, although in severe cases, intravenous administration may be necessary and should be done by trained medical professionals only.</br></br>
      - In cases of cardiac arrest: Use defibrillation to restore normal heart rhythm and perform cardiopulmonary resuscitation (CPR) as per established protocols.</br></br>
      Maintain an open airway and monitor vital signs closely.</br></br>
  
      <strong>Hazard:</strong> Certain deviations from normal vital signs may indicate underlying health issues or emergencies. It is essential to recognize these deviations and respond promptly to ensure the well-being of individuals. Always follow medical guidelines and protocols for assessing and managing vital signs.`,
  },   
  
    {
      title: "Heart Attack",
      content: `
      
      <strong>What is heart attack?</strong> A heart attack, also known as a myocardial infarction, occurs when blood flow to a part of the heart muscle is blocked for a long enough time that part of the heart muscle is damaged or dies. This can happen due to the buildup of plaque (atherosclerosis) in the coronary arteries, leading to a blockage. Symptoms may include chest pain or discomfort, shortness of breath, nausea, and lightheadedness.</br></br>

      <strong>Symptoms:</strong> Chest pain or discomfort, shortness of breath, nausea, sweating.</br></br>

      <strong>Treatment:</strong> Administer aspirin (300 mg to 325 mg) to chew and swallow.</br>
      Administer oxygen if needed.

      Monitor vital signs and prepare for potential cardiac arrest.</br></br>
      
      <strong>Hazard:</strong> Avoid unnecessary movement to prevent worsening of chest pain or dislodging of blood clots. Keep the patient calm and reassure them.</br></br>`
    },
    {
        title: "Cardiac Arrest",
        content: `
        <strong>What is a cardiac arrest?</strong> Cardiac arrest is the sudden loss of heart function, breathing, and consciousness. It occurs when the heart's electrical system malfunctions, causing an irregular heartbeat (arrhythmia). This can lead to the heart suddenly stopping, preventing blood from being pumped to the rest of the body. Immediate CPR and defibrillation are essential to restore heart function and save lives.</br></br>
        
        <strong>Symptoms:</strong> Sudden loss of consciousness, absence of breathing, no pulse.</br></br>

        <strong>Treatment:</strong> Begin CPR immediately (30 compressions, 2 breaths).</br>
        Use an automated external defibrillator (AED) if available.</br></br>
        
        <strong>Hazards:</strong> Suspected spinal injury—avoid excessive movement, maintain neutral alignment, and limit </br>interventions that may exacerbate spinal damage.</br> `,
      },

      {
        title: "Low blood sugar",
        content: `
        <strong>What is Hypoglycemia?</strong> Hypoglycemia, also known as low blood sugar, occurs when blood glucose levels drop below normal levels. This can happen in individuals with diabetes who take insulin or certain medications. Symptoms may include sweating, trembling, rapid heartbeat, hunger, confusion, and weakness. Severe hypoglycemia can lead to unconsciousness and seizures if left untreated.</br></br>

        <strong>Symptoms:</strong> Shakiness, confusion.</br></br>
        
        <strong>Treatment:</strong> Administer oral glucose or intravenous dextrose.</br></br>
        
        <strong>Hazard:</strong> Potential for unconsciousness. Monitor airway and breathing closely. Do not administer oral </br>
        glucose if patient is unconscious or unable to swallow.`,
      },
      {
        "title": "Internal Bleeding",
        "content": `
          <strong>What is Internal Bleeding?</strong> Internal bleeding refers to the loss of blood that occurs inside the body where it cannot be seen. This can happen due to trauma, such as a car accident or fall, or it can be caused by medical conditions like ulcers or ruptured blood vessels. Internal bleeding can be life-threatening if not promptly treated.</br></br>
      
          <strong>Symptoms:</strong> Symptoms of internal bleeding may vary depending on the location and severity but can include abdominal pain and tenderness, lightheadedness or dizziness, pale skin, bruising, and swelling.</br></br>
          
          <strong>Treatment:</strong> Administering 1-2 grams of tranexamic acid (TXA) can help mitigate internal bleeding, especially in cases of major trauma. TXA works by inhibiting the breakdown of blood clots, thereby reducing blood loss. However, its use should be guided by medical protocols and dosages adjusted according to the patient's condition and medical history.</br></br>
          
          <strong>Hazard:</strong> Internal bleeding can lead to hypovolemic shock, organ damage, and even death if not managed promptly and effectively. Assessing the patient's vital signs, providing oxygen if necessary, and preparing for rapid transport to a medical facility are essential steps in treating internal bleeding as a paramedic.</br>`
      },      

      {
        title: "Stroke",
        content: `
        <strong>What is a stroke?</strong> A stroke occurs when the blood supply to part of the brain is interrupted or reduced, depriving brain tissue of oxygen and nutrients. This can result in the death of brain cells and can lead to various symptoms such as sudden weakness or numbness of the face, arm, or leg, trouble speaking or understanding speech, and difficulty walking.</br></br>

        <strong>Symptoms:</strong> Facial drooping, arm weakness, slurred speech, sudden confusion.</br></br>

        <strong>Treatment:</strong>Assess and document time of symptom onset. </br>
        Transport to a stroke center for immediate evaluation and potential thrombolytic therapy.</br></br>
        <strong>Hazards:</strong> Monitor airway for potential aspiration due to decreased level of consciousness.</br>`
      },

      {
        title: "Allergic Reaction",
        content: `
        <strong>What is a Allergic Reaction?</strong>An allergic reaction occurs when the immune system overreacts to a substance (allergen) that is usually harmless to most people. Symptoms can range from mild to severe and may include skin rashes, itching, swelling, hives, nasal congestion, difficulty breathing, wheezing, and anaphylaxis—a life-threatening reaction that requires immediate medical treatment.</br></br>

        <strong>Symptoms:</./strong> Itching, hives, difficulty breathing. </br></br>
        
        <strong>Treatment:</strong> Administer intramuscular epinephrine, monitor vital signs. </br></br>
        
        <strong>Hazard:</strong> Potential for severe respiratory distress. Administer epinephrine promptly and be prepared to assist with airway management. </br>`
      },

      {
        title: "Car Crash",
        content: `
        Assess for injuries, control bleeding, maintain spinal precautions.</br></br>

<strong>Hazard:</strong> Multiple potential injuries including head, neck, and spinal trauma. Avoid moving the patient unnecessarily. Stabilise head and neck before transport if spinal injury is suspected.`
      },

      {
        title: "Nose Bleed",
        content: `
        <strong>What is a Nose Bleed?</strong> 
        Epistaxis, or a nosebleed, occurs when blood flows from the nasal passages. It can result from various factors like dry air, nasal trauma, allergies, or medical conditions such as hypertension. Anterior nosebleeds are common and originate from the front part of the nose, while posterior nosebleeds, originating from deeper vessels, are less common but may require medical intervention. Treatment involves applying pressure to the nostrils and addressing underlying causes.</br></br>

        <strong>Treatment:</strong> Have the patient sit upright, pinch the nostrils together for 10-15 minutes, apply ice pack to the bridge of the nose.</br></br>

        <strong>Hazard:</strong> Risk of aspiration if blood flows into the throat. Monitor airway and breathing closely. Instruct the patient not to tilt their head back.`
      },

      {
        title: "Cuts, Bruises, and Blisters",
        content: `
        <strong>Treatment:</strong> Have the patient sit upright, pinch the nostrils together for 10-15 minutes, apply ice pack to the bridge of the nose.</br></br>

        <strong>Hazard:</strong> Risk of aspiration if blood flows into the throat. Monitor airway and breathing closely. Instruct the patient not to tilt their head back.`
      },

      {
        title: "First-Degree Burns",
        content: `
        <strong>What is a First-Degree Burn?</strong> First-degree burns are superficial burns that only affect the outer layer of skin (epidermis). They typically cause redness, pain, and minor swelling. Sunburns are a common example of first-degree burns.<br></br>

        <strong>Symptoms:</strong> Redness and mild swelling of the skin.
        Pain and tenderness at the burn site.
        No blisters present.</br></br>
        
        <strong>Treatment:</strong> immerse the affected area in cool water or apply a cold compress.</br>
        Cover the burn with a sterile, non-adhesive dressing.Administer over-the-counter pain relievers if necessary.</br></br>
               
        <strong>Hazards:</strong>Risk of infection due to compromised skin integrity.
        Potential for hypothermia if cooling is prolonged.
        `
      },

      {
        title: "Second-Degree Burns",
        content: `
        <strong>What is a Second-Degree Burn?</strong> Second-degree burns penetrate deeper into the skin, affecting both the epidermis and dermis layers. They often result in blistering, severe pain, redness, and swelling. These burns can be caused by exposure to flames, hot liquids, or prolonged contact with hot surfaces. Medical attention may be necessary to prevent infection and promote healing. Treatment typically involves keeping the affected area clean, applying topical medications, and sometimes, the need for specialized dressings or wound care techniques.</br></br>

        <strong>Symptoms:</strong> Blisters, severe pain, and swelling.
        Red or splotchy appearance of the skin.</br></br>
        
        <strong>Treatment:</strong> Cool the burn with cool, running water for at least 10-20 minutes.
        Clean the area with mild soap and water.
        Apply a sterile dressing and elevate the affected area.</br></br>
        
        <strong>Hazards:</strong>Risk of infection and scarring.
        Potential for fluid loss and electrolyte imbalance.
        `
      },

      {
        title: "Third-Degree Burns",
        content: `
        <strong>What is a Third-Degree Burn?</strong> Third-degree burns are the most severe type of burn, extending through all layers of the skin and potentially damaging underlying tissues, muscles, and bones. They may appear white, charred, or leathery and can be painless due to nerve damage. Third-degree burns require immediate medical attention and may necessitate skin grafting and intensive care.</br></br>

        <strong>Symptoms:</strong> White or charred appearance of the skin.
        Numbness or complete lack of sensation in the affected area.</br></br>
        
        <strong>Treatment:</strong> Do not attempt to cool or immerse the burn.
        Cover the burn loosely with a clean, dry cloth.
        Seek immediate medical attention.</br></br>
        
        <strong>Hazards:</strong> Risk of infection and tissue damage.
        Potential for life-threatening complications, including shock and organ failure.
        `
      },

      {
        title: "Drowning",
        content: `
        <strong>What is Hypothermia?</strong> Hypothermia is a medical emergency that occurs when the body loses heat faster than it can produce it, causing the body temperature to drop below normal levels. Symptoms may include shivering, confusion, slurred speech, drowsiness, and weak pulse. Severe hypothermia can be life-threatening and requires immediate medical attention.</br></br>

        <strong>Symptoms:</strong>       
         Difficulty breathing,
        Cyanosis,
        Unconsciousness.</br></br>
        
        
        <strong>Treatment:</strong> 
        Remove from water,
        Check responsiveness and breathing,
        Initiate CPR if needed,
        Clear airways and administer rescue breaths,
        Provide oxygen and monitor vital signs.
        `
      },

      {
        title: "Secondary Drowning",
        content: `
        <strong>What is Secondary Drowning?</strong> Secondary drowning, also known as dry drowning, occurs when water is inhaled into the lungs, leading to breathing difficulties hours after leaving the water. It can result from near-drowning incidents or inhaling small amounts of water while swimming. Symptoms may include coughing, difficulty breathing, chest pain, and extreme fatigue.</br></br>

        <strong>What is Hypothermia?</strong> Hypothermia is a medical emergency that occurs when the body loses heat faster than it can produce it, causing the body temperature to drop below normal levels. Symptoms may include shivering, confusion, slurred speech, drowsiness, and weak pulse. Severe hypothermia can be life-threatening and requires immediate medical attention.</br></br>

        <strong>Secondary Drowning:</strong> Monitor for symptoms of secondary drowning, including respiratory distress and coughing, for up to 24 hours post-submersion.
        Provide prompt medical intervention if symptoms arise.</br></br>
        
        <strong>Hypothermia:</strong> Monitor body temperature and provide rewarming measures as needed.
        Watch for signs of hypothermia, such as shivering, confusion, and decreased level of consciousness.
        `
      },

      {
        "title": "Asthma Attack",
        "content": `
          <strong>What is an Asthma Attack?</strong> An asthma attack occurs when the airways become inflamed, making it difficult to breathe. It can be triggered by allergens, exercise, or respiratory infections.</br></br>
      
          <strong>Symptoms:</strong> Wheezing, coughing, shortness of breath, chest tightness.</br></br>
          
          <strong>Treatment:</strong> Administering bronchodilators (such as albuterol) via inhaler, providing oxygen therapy, and monitoring respiratory status.</br></br>
          
          <strong>Hazard:</strong> Potential for severe respiratory distress leading to respiratory failure if not managed promptly.</br>`
      },
      
      {
        "title": "Seizure Management",
        "content": `
          <strong>What is a Seizure?</strong> A seizure is a sudden, uncontrolled electrical disturbance in the brain that can cause changes in behavior, movements, and consciousness.</br></br>
      
          <strong>Symptoms:</strong> Convulsions, loss of consciousness, confusion, drooling.</br></br>
          
          <strong>Treatment:</strong> Protect the individual from injury during the seizure by clearing the area of objects, cushioning the head, and placing them in a safe position. After the seizure, monitor vital signs and provide supportive care.</br></br>
          
          <strong>Diazepam Dosage:</strong> The usual dose of diazepam for seizure control in adults is 5-10 mg administered intravenously (IV) or intramuscularly (IM). The dose may be repeated every 10-15 minutes as needed, up to a maximum of 30 mg within 8 hours.</br></br>
          
          <strong>Hazard:</strong> Risk of injury due to falls or convulsions, potential for aspiration during the seizure.</br>`
      },
      
      {
        "title": "Hyperglycemia (High Blood Sugar)",
        "content": `
          <strong>What is Hyperglycemia?</strong> Hyperglycemia occurs when blood glucose levels are elevated, commonly seen in individuals with diabetes.</br></br>
      
          <strong>Symptoms:</strong> Increased thirst, frequent urination, fatigue, blurred vision.</br></br>
          
          <strong>Treatment:</strong> Administer insulin as prescribed by a healthcare provider, encourage hydration, and monitor blood glucose levels closely.</br></br>
          
          <strong>Hazard:</strong> Risk of diabetic ketoacidosis (DKA) or hyperosmolar hyperglycemic state (HHS) if untreated, which can lead to coma and death.</br>`
      },
      
      {
        "title": "Heat Stroke",
        "content": `
          <strong>What is Heat Stroke?</strong> Heat stroke is a severe form of heat illness characterized by a body temperature above 104°F (40°C) accompanied by neurological symptoms.</br></br>
      
          <strong>Symptoms:</strong> High body temperature, altered mental status, hot and dry skin, rapid pulse, nausea, and vomiting.</br></br>
          
          <strong>Treatment:</strong> Rapid cooling measures such as cold water immersion or ice packs, IV fluids to rehydrate, and monitoring for complications such as rhabdomyolysis or organ failure.</br></br>
          
          <strong>Hazard:</strong> Risk of multi-organ dysfunction and death if not treated promptly.</br>`
      },      

      {
        "title": "Drug Overdose",
        "content": `
          <strong>What is an Drug Overdose?</strong> 
          An overdose occurs when an individual ingests or is exposed to a toxic amount of a substance, leading to harmful effects on the body. Overdoses can involve prescription medications, illicit drugs, alcohol, or even household chemicals. Prompt intervention is crucial to prevent serious complications or fatalities.</br></br>
      
          <strong>Symptoms:</strong> Symptoms vary depending on the substance but may include altered mental status, difficulty breathing, seizures, or loss of consciousness.</br></br>
      
          <strong>Treatment:</strong> If the specific substance is unknown, seek immediate medical assistance. Activated charcoal can help absorb toxins in the stomach, but it should only be administered orally by trained medical professionals such as paramedics. Maintain an open airway and monitor vital signs.</br></br>
      
          <strong>Hazard:</strong> Overdoses can lead to life-threatening complications such as respiratory depression or cardiac arrest. Ensure the safety of both the individual experiencing the overdose and any responders. Do not induce vomiting unless instructed by medical professionals.`,
      },
      
      {
        "title": "Mild Head Injury",
        "content": `
        <strong>Symptoms:</strong></br></br>
        Headache</br>
        Dizziness</br>
        Nausea or vomiting</br>
        Sensitivity to light or noise</br>
        Mild confusion or disorientation</br>
        Fatigue or drowsiness</br>
        Temporary loss of consciousness (for a few seconds)</br></br>

        <strong>Treatment:</strong></br></br>
        Rest: Physical and cognitive rest is crucial following a mild head injury to allow the brain to heal. Avoiding activities that worsen symptoms, such as screen time, reading, or physical exertion, is recommended.
        Pain Management: Over-the-counter pain relievers such as acetaminophen (Tylenol) or ibuprofen (Advil, Motrin) may help alleviate headaches.
        Observation: Patients with mild head injuries should be closely monitored for any worsening symptoms. If symptoms persist or worsen, medical evaluation may be necessary.</br></br>
        Gradual Return to Activity: Once symptoms improve, a gradual return to normal activities, including work, school, and physical exertion, is recommended under the guidance of a healthcare professional.
Avoidance of Second Impact Syndrome: Individuals who have experienced a concussion should avoid activities that increase the risk of another head injury until fully recovered to prevent the rare but potentially life-threatening condition known as second impact syndrome.
</br></br>
<strong>Hazards:</strong></br></br>
While most individuals recover fully from a mild head injury, there is a risk of complications if not managed properly.
Hazards may include prolonged symptoms such as persistent headaches, difficulty concentrating, memory problems, mood changes, and increased risk of future concussions.
Multiple concussions over time can increase the risk of developing chronic traumatic encephalopathy (CTE), a degenerative brain condition associated with repetitive head trauma.
        `
      },

      {
        "title": "Diabetic Ketoacidosis (DKA)",
        "content": `
          <strong>What is Diabetic Ketoacidosis (DKA)?</strong> Diabetic ketoacidosis is a serious complication of diabetes that occurs when the body produces high levels of blood acids called ketones. It is most commonly seen in individuals with type 1 diabetes but can also occur in those with type 2 diabetes under certain conditions. DKA requires immediate medical treatment to prevent coma or death.</br></br>
          
          <strong>Symptoms:</strong> Excessive thirst, frequent urination, nausea, vomiting, abdominal pain, fruity-smelling breath, rapid breathing, confusion, fatigue.</br></br>
      
          <strong>Treatment:</strong> Administer intravenous fluids to rehydrate and correct electrolyte imbalances. Insulin therapy is crucial to lower blood glucose levels and reverse ketosis. Monitor blood glucose, electrolytes, and acid-base balance closely. Address any underlying triggers, such as infection or missed insulin doses.</br></br>
          
          <strong>Hazard:</strong> DKA can lead to severe complications, including cerebral edema, acute respiratory distress syndrome (ARDS), and cardiovascular collapse.`,
      },
      
      {
        "title": "Opioid Overdose",
        "content": `
          <strong>What is an Opioid Overdose?</strong> An opioid overdose occurs when an individual consumes or is exposed to an excessive amount of opioid drugs, leading to respiratory depression, coma, or death. Opioids include prescription painkillers like oxycodone and hydrocodone, as well as illicit drugs such as heroin and fentanyl.</br></br>
          
          <strong>Symptoms:</strong> Slow or shallow breathing, pinpoint pupils, loss of consciousness, blue lips or fingertips, cold or clammy skin, slow heartbeat.</br></br>
      
          <strong>Treatment:</strong> Administer naloxone (Narcan) intravenously or intramuscularly to reverse opioid effects and restore normal breathing. Provide respiratory support (e.g., bag-mask ventilation) if necessary. Monitor vital signs closely and transport the individual to a medical facility for further evaluation and care.</br></br>
          
          <strong>Hazard:</strong> Opioid overdoses can be fatal if not treated promptly. Continued monitoring and support are essential to prevent relapse into respiratory depression.`,
      },
      
      {
        "title": "Hypovolemic Shock",
        "content": `
          <strong>What is Hypovolemic Shock?</strong> Hypovolemic shock is a life-threatening condition that occurs when the body loses a significant amount of blood or fluids, leading to inadequate tissue perfusion and oxygen delivery. It can result from severe bleeding, dehydration, burns, or trauma.</br></br>
          
          <strong>Symptoms:</strong> Rapid heart rate, low blood pressure, pale or clammy skin, cold extremities, rapid and shallow breathing, altered mental status, weak pulse.</br></br>
      
          <strong>Treatment:</strong> Control bleeding by applying direct pressure, elevating the affected limb, or using tourniquets if necessary. Administer intravenous fluids (e.g., saline or lactated Ringer's solution) to restore circulating volume. Monitor vital signs, urine output, and mental status closely. Consider blood transfusion for severe hemorrhage.</br></br>
          
          <strong>Hazard:</strong> Hypovolemic shock can progress rapidly to organ failure and death if not treated promptly. Early recognition and intervention are critical to improve outcomes.`,
      },
      
      {
        "title": "Hyperkalemia",
        "content": `
          <strong>What is Hyperkalemia?</strong> Hyperkalemia is a medical condition characterized by abnormally high levels of potassium in the bloodstream. It can result from kidney dysfunction, certain medications, or conditions that cause potassium to shift out of cells, such as trauma or acidosis. Severe hyperkalemia can lead to cardiac arrhythmias and cardiac arrest.</br></br>
          
          <strong>Symptoms:</strong> Weakness, fatigue, palpitations, nausea, tingling sensations, muscle cramps, paralysis.</br></br>
      
          <strong>Treatment:</strong> Administer calcium gluconate or calcium chloride to stabilize cardiac membranes. Use insulin and glucose to promote intracellular potassium uptake. Administer loop diuretics (e.g., furosemide) or potassium-binding resins (e.g., sodium polystyrene sulfonate) to enhance potassium excretion. Consider hemodialysis for severe or refractory hyperkalemia.</br></br>
          
          <strong>Hazard:</strong> Hyperkalemia can lead to life-threatening cardiac arrhythmias, including ventricular fibrillation and asystole. Prompt treatment is essential to prevent cardiac complications.`,
      },
      
      {
        "title": "Meningitis",
        "content": `
          <strong>What is Meningitis?</strong> Meningitis is inflammation of the meninges, the protective membranes covering the brain and spinal cord. It can be caused by bacterial, viral, or fungal infections, with bacterial meningitis being the most severe and potentially fatal form. Meningitis requires prompt medical evaluation and treatment to prevent complications such as brain damage or death.</br></br>
          
          <strong>Symptoms:</strong> Sudden high fever, severe headache, stiff neck, sensitivity to light (photophobia), nausea, vomiting, confusion, seizures, rash (in some cases).</br></br>
      
          <strong>Treatment:</strong> Administer antibiotics (e.g., ceftriaxone or vancomycin) empirically while awaiting culture results for bacterial meningitis. Provide supportive care, including intravenous fluids, pain management, and antipyretics. In cases of viral meningitis, treatment is generally supportive, focusing on symptom relief.</br></br>
          
          <strong>Hazard:</strong> Meningitis can lead to serious complications, such as brain damage, hearing loss, and death, particularly if not treated promptly with appropriate antibiotics.`,
      },
      
      {
        "title": "Status Epilepticus",
        "content": `
          <strong>What is Status Epilepticus?</strong> Status epilepticus is a medical emergency characterized by prolonged or recurrent seizures without regaining consciousness between episodes. It can result from epilepsy, brain injury, infection, or other factors. Status epilepticus requires immediate intervention to prevent brain injury and other complications.</br></br>
          
          <strong>Symptoms:</strong> Continuous or recurrent seizures lasting more than five minutes, impaired consciousness, convulsions, muscle rigidity, drooling, loss of bladder or bowel control.</br></br>
      
          <strong>Treatment:</strong> Administer benzodiazepines (e.g., lorazepam or diazepam) as first-line therapy to terminate seizures. If seizures persist, escalate treatment with antiepileptic drugs such as phenytoin or fosphenytoin. Consider intubation and mechanical ventilation for airway protection if necessary. Monitor for and treat underlying causes, such as electrolyte imbalances or infections.</br></br>
          
          <strong>Hazard:</strong> Status epilepticus can lead to neuronal injury, respiratory failure, and death if not treated promptly and effectively. Early recognition and aggressive management are essential to improve outcomes.`,
      },
      
      {
        "title": "Acute Pancreatitis",
        "content": `
          <strong>What is Acute Pancreatitis?</strong> Acute pancreatitis is inflammation of the pancreas, often characterized by sudden onset of severe abdominal pain. It can be caused by gallstones, alcohol consumption, medications, infections, or other factors. Acute pancreatitis ranges in severity from mild self-limiting attacks to severe, life-threatening complications.</br></br>
          
          <strong>Symptoms:</strong> Sudden onset of severe upper abdominal pain, nausea, vomiting, fever, rapid pulse, swollen or tender abdomen.</br></br>
      
          <strong>Treatment:</strong> Provide supportive care, including intravenous fluids, pain management, and bowel rest (nothing by mouth). Administer analgesics (e.g., opioids or nonsteroidal anti-inflammatory drugs) for pain relief. Address underlying causes, such as gallstones or alcohol abuse. Consider consultation with a gastroenterologist or surgeon for further management.</br></br>
          
          <strong>Hazard:</strong> Acute pancreatitis can lead to serious complications, including pancreatic necrosis, infection, pancreatic pseudocysts, or multiorgan failure, particularly in severe cases. Early recognition and appropriate management are crucial to prevent adverse outcomes.`,
      },

      {
        "title": "Pulmonary Embolism",
        "content": `
          <strong>What is Pulmonary Embolism?</strong> Pulmonary embolism (PE) is a blockage of one or more arteries in the lungs, usually caused by blood clots that travel from the legs or other parts of the body. PE can be life-threatening, especially if the clot is large or if there are multiple clots. Prompt medical intervention is essential to prevent complications such as pulmonary infarction or right heart failure.</br></br>
          
          <strong>Symptoms:</strong> Sudden onset of shortness of breath, chest pain (worsens with deep breathing or coughing), rapid heartbeat, cough (may produce bloody or foamy sputum), fainting, sweating, lightheadedness.</br></br>
      
          <strong>Treatment:</strong> Administer anticoagulants (e.g., heparin or enoxaparin) to prevent further clot formation. Oxygen therapy may be needed to maintain oxygen saturation. Consider thrombolytic therapy (e.g., alteplase) in hemodynamically unstable patients. Monitor vital signs, oxygen saturation, and cardiac rhythm closely.</br></br>
          
          <strong>Hazard:</strong> Pulmonary embolism can lead to respiratory failure, shock, or cardiac arrest if not diagnosed and treated promptly. Early recognition and appropriate management are crucial to improve outcomes.`,
      },
  ];
  

  function displayArticles(articlesToShow) {
    const noResultsMessage = document.querySelector('.no-results');
    noResultsMessage.style.display = "none";

    articleContainer.innerHTML = "";
    articlesToShow.forEach((article, index) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.content.substring(0, 100)}...</p>
        `;
        articleElement.addEventListener("click", function () {
            displayArticleDetails(articles.indexOf(article)); 
            updateURL(articles.indexOf(article)); 
        });
        articleContainer.appendChild(articleElement);
    });

    if (articlesToShow.length === 0) {
        noResultsMessage.style.display = "block";
    }
}


  

function displayArticleDetails(index) {
    const article = articles[index];
    articleDetails.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.content}</p>
    `;
    articleDetails.style.display = "block";
    articleContainer.style.display = "none";
    articleDetails.appendChild(backButton);
}

backButton.addEventListener("click", function() {
    articleDetails.style.display = "none";
    articleContainer.style.display = "block";
    updateURL();
});

searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm)
    );
    displayArticles(filteredArticles);
    updateURL();
});

function updateURL(index) {
    const articleId = index !== undefined ? index + 1 : "";
    const url = window.location.origin + window.location.pathname + (articleId ? `?article=${articleId}` : "");
    window.history.pushState({}, "", url);
}

function getArticleIndexFromURL() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("article");
    return articleId ? parseInt(articleId) - 1 : null;
}

displayArticles(articles);

const articleIndexFromURL = getArticleIndexFromURL();
if (articleIndexFromURL !== null && articleIndexFromURL >= 0 && articleIndexFromURL < articles.length) {
    displayArticleDetails(articleIndexFromURL);
}

