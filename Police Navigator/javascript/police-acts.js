const searchInput = document.getElementById("search-input");
const articleContainer = document.getElementById("article-container");
const articleDetails = document.getElementById("article-details");
const backButton = document.createElement("div");
backButton.classList.add("back-button");
backButton.textContent = "Go back";

const articles = [
  {
    "title": "Police and Criminal Evidence Act 1984 (PACE)",
    "content": `
    <strong>Section 1</strong> | Power of constable to stop and search persons, vehicles etc.</br></br>
    <strong>Section 3</strong> | Duty to make records concerning searches.</br></br>
    <strong>Section 17</strong> | Entry for purpose of arrest etc.</br></br>
    <strong>Section 18</strong> | Entry and search after arrest.</br></br>
    <strong>Section 19</strong> | General power of seizure etc.</br></br>
    <strong>Section 24</strong> | Arrest without warrant: constables.</br></br>
    <strong>Section 24A</strong> | Arrest without warrant: other persons.</br></br>
    <strong>Section 27</strong> | Fingerprinting of certain offenders.</br></br>
    <strong>Section 31</strong> | Arrest for further offence.</br></br>
    <strong>Section 32</strong> | Search upon arrest.</br></br>
    <strong>Section 54</strong> | Searches of detained persons.</br></br>
    <strong>Section 55</strong> | Intimate searches.</br></br>
    <strong>Section 117</strong> | Power of constable to use reasonable force.
    `
  },   

  {
    "title": "Misuse of Drugs Act (MODA) 1971",
    "content": `
    <strong>Section 4</strong> | Restriction of production and supply of controlled drugs.</br></br>
    <strong>Section 5(2)</strong> |  Possession of controlled drugs.</br></br>
    <strong>Section 5(3)</strong> | Possession of controlled drugs with intent to supply.</br></br>
    <strong>Section 23</strong> | Powers to search and obtain evidence.</br></br>
    <strong>Section 4</strong> | Power of arrest
    `
  },   

  {
    "title": "Roads Traffic Act 1988",
    "content": `
    <strong>Section 1</strong> | Causing death by dangerous driving.</br></br>
    <strong>Section 1A</strong> | Causing serious injury by dangerous driving.</br></br>
    <strong>Section 2</strong> | Dangerous driving.</br></br>
    <strong>Section 2B</strong> | Causing death by careless, or inconsiderate, driving.</br></br>
    <strong>Section 3</strong> | Careless, and inconsiderate, driving.</br></br>
    <strong>Section 3ZB</strong> | Causing death by driving: unlicensed... or uninsured drivers.</br></br>
    <strong>Section 3ZD</strong> | Causing serious injury by driving: disqualified drivers.</br></br>
    <strong>Section 3A</strong> | Causing death by careless driving when under influence of drink or drugs.</br></br>
    <strong>Section 4</strong> | Driving, or being in charge, when under influence of drink or drugs.</br></br>
    <strong>Section 5</strong> | Driving or being in charge of a motor vehicle with alcohol concentration above prescribed limit.</br></br>
    <strong>Section 5A</strong> | Driving or being in charge of a motor vehicle with concentration of specified controlled drug above specified limit.</br></br>
    <strong>Section 6</strong> | Power to administer preliminary tests.</br></br>
    <strong>Section 6A</strong> | Preliminary breath test.</br></br>
    <strong>Section 6B</strong> | Preliminary impairment test.</br></br>
    <strong>Section 6C</strong> | Preliminary drug test.</br></br>
    <strong>Section 6D</strong> | Arrest.</br></br>
    <strong>Section 6E</strong> | Power of entry.</br></br>
    <strong>Section 7</strong> | Provision of specimens for analysis.</br></br>
    <strong>Section 7A</strong> | Specimens of blood taken from persons incapable of consenting.</br></br>
    <strong>Section 10</strong> | Detention of persons affected by alcohol or a drug.</br></br>
    <strong>Section 12</strong> | Motor racing on public ways.</br></br>
    <strong>Section 14</strong> | Seat belts: adults.</br></br>
    <strong>Section 15</strong> | Restriction on carrying children not wearing seat belts in motor vehicles.</br></br>
    <strong>Section 15A</strong> | Safety equipment for children in motor vehicles.</br></br>
    <strong>Section 16</strong> | Wearing of protective headgear.</br></br>
    <strong>Section 17</strong> | Protective helmets for motor cyclists.</br></br>
    <strong>Section 18</strong> | Authorisation of head-worn appliances for use on motor cycles.</br></br>
    <strong>Section 19</strong> | Prohibition of parking of HGVs on verges, central reservations and footways.</br></br>
    <strong>Section 19A</strong> | Prohibition of parking of vehicles on verges, central reservations and footways.</br></br>
    <strong>Section 21</strong> | Prohibition of driving or parking on cycle tracks.</br></br>
    <strong>Section 22</strong> | Leaving vehicles in dangerous positions.</br></br>
<strong>Section 22A</strong> | Causing danger to road-users.</br></br>
<strong>Section 23</strong> | Restriction of carriage of persons on motor cycles.</br></br>
<strong>Section 24</strong> | Restriction of carriage of persons on bicycles.</br></br>
<strong>Section 25</strong> | Tampering with motor vehicles.</br></br>
<strong>Section 26</strong> | Holding or getting on to vehicle in order to be towed or carried.</br></br>
<strong>Section 27</strong> | Control of dogs on roads.</br></br>
<strong>Section 28</strong> | Dangerous cycling.</br></br>
<strong>Section 29</strong> | Careless, and inconsiderate, cycling.</br></br>
<strong>Section 30</strong> | Cycling when under influence of drink or drugs.</br></br>
<strong>Section 31</strong> | Regulation of cycle racing on public ways.</br></br>
<strong>Section 32</strong> | Electrically assisted pedal cycles.</br></br>
<strong>Section 33</strong> | Control of use of footpaths, bridleways and restricted byways for motor vehicle trials.</br></br>
<strong>Section 34</strong> | Prohibition of driving mechanically propelled vehicles elsewhere than on roads.</br></br>
<strong>Section 35</strong> | Drivers to comply with traffic directions.</br></br>
<strong>Section 36</strong> | Drivers to comply with traffic signs.</br></br>
<strong>Section 37</strong> | Directions to pedestrians.</br></br>
<strong>Section 39</strong> | Powers of Secretary of State and local authorities as to giving road safety information and training.</br></br>
<strong>Section 40</strong> | Road safety grants.</br></br>
<strong>Section 40A</strong> | Using vehicle in dangerous condition etc.</br></br>
<strong>Section 41</strong> | Regulation of construction, weight, equipment and use of vehicles.</br></br>
<strong>Section 41B</strong> | Breach of requirement as to weight: goods and passenger vehicles.</br></br>
<strong>Section 41C</strong> | Breach of requirement as to speed assessment equipment detection devices.</br></br>
<strong>Section 41D</strong> | Breach of requirements as to control of vehicle, mobile telephones etc.</br></br>
<strong>Section 46A</strong> | Use of records of vehicle examinations, etc.</br></br>
<strong>Section 46B</strong> | Evidence from records of vehicle examinations.</br></br>
<strong>Section 48</strong> | Supplementary provisions about test certificates.</br></br>
<strong>Section 70</strong> | Power to prohibit driving of overloaded goods vehicles.</br></br>
<strong>Section 75</strong> | Vehicles not to be sold in unroadworthy condition or altered so as to be unroadworthy.</br></br>
<strong>Section 87</strong> | Drivers of motor vehicles to have driving licences.</br></br>
<strong>Section 96</strong> | Driving with uncorrected defective eyesight.</br></br>
<strong>Section 99A</strong> | Authorisation to drive in Great Britain.</br></br>
<strong>Section 101</strong> | Disqualification of persons under age.</br></br>
<strong>Section 103</strong> | Obtaining licence, or driving, while disqualified.</br></br>
<strong>Section 163</strong> | Power of police to stop vehicles.</br></br>
<strong>Section 164</strong> | Power of constables to require production of driving licence and in certain cases statement of date of birth.</br></br>
<strong>Section 165</strong> | Power of constables to obtain names and addresses of drivers and others, and to require production of evidence of insurance ... and test certificates.</br></br>
<strong>Section 165A</strong> | Power to seize vehicles driven without licence or insurance.</br></br>
<strong>Section 168</strong> | Failure to give, or giving false, name and address in case of reckless or careless or inconsiderate driving or cycling.</br></br>
<strong>Section 170</strong> | Duty of driver to stop, report accident and give information or documents.</br></br>
<strong>Section 173</strong> | Forgery of documents, etc.</br></br>
<strong>Section 175</strong> | Issue of false documents.</br></br>
<strong>Section 176</strong> | Power to seize articles in respect of which offences under sections 173 to 175 may have been committed.</br></br>
<strong>Section 177</strong> | Impersonation of authorised examiner, etc.</br></br>
    `
  },  

  {
    "title": "Public Order Act 1986",
    "content": `
    <strong>Section 1</strong> | Riot.</br></br>
    <strong>Section 2</strong> | Violent disorder.</br></br>
    <strong>Section 3</strong> | Affray.</br></br>
    <strong>Section 4</strong> | Fear or provocation of violence.</br></br>
    <strong>Section 4A</strong> | Intentional harassment, alarm or distress.</br></br>
    <strong>Section 5</strong> | Harassment, alarm or distress.</br></br>
    <strong>Section 11</strong> | Advance notice of public processions.</br></br>
    <strong>Section 12</strong> | Imposing conditions on public processions.</br></br>
    <strong>Section 14</strong> | Imposing conditions on public assemblies.</br></br>
    <strong>Section 14ZA</strong> | Imposing conditions on one-person protests.</br></br>
    <strong>Section 14A</strong> | Prohibiting trespassory assemblies.</br></br>
    <strong>Section 14B</strong> | Offences in connection with trespassory assemblies and arrest therefor.</br></br>
    <strong>Section 14C</strong> | Stopping persons from proceeding to trespassory assemblies.</br></br>
    <strong>Section 18</strong> | Use of words or behaviour or display of written material.</br></br>
    <strong>Section 19</strong> | Publishing or distributing written material.</br></br>
    <strong>Section 20</strong> | Public performance of play.</br></br>
    <strong>Section 21</strong> | Distributing, showing or playing a recording.</br></br>
    <strong>Section 22</strong> | Broadcasting or including programme in cable programme service.</br></br>
    <strong>Section 23*</strong> | Possession of racially inflammatory material.</br></br>
    <strong>Section 24*</strong> | Powers of entry and search.</br></br>
    <strong>Section 29B</strong> | Use of words or behaviour or display of written material.</br></br>
    <strong>Section 29C</strong> | Publishing or distributing written material.</br></br>
    <strong>Section 29E</strong> | Distributing, showing or playing a recording.</br></br>
    <strong>Section 29F</strong> | Broadcasting or including programme in programme service.</br></br>
    <strong>Section 29G*</strong> | Possession of inflammatory material.</br></br>
    <strong>Section 29H*</strong> | Powers of entry and search.
    `
  },   

  {
    "title": "Public Order Act 2023",
    "content": `
    <strong>Section 1</strong> | Offence of locking on.</br></br>
    <strong>Section 2</strong> | Offence of being equipped for locking on.</br></br>
    <strong>Section 3</strong> | Offence of causing serious disruption by tunnelling.</br></br>
    <strong>Section 4</strong> | Offence of causing serious disruption by being present in a tunnel.</br></br>
    <strong>Section 5</strong> | Offence of being equipped for tunnelling etc.</br></br>
    <strong>Section 6</strong> | Obstruction etc of major transport works.</br></br>
    <strong>Section 7</strong> | Interference with use or operation of key national infrastructure.</br></br>
    <strong>Section 9</strong> | Offence of interference with access to or provision of abortion services.</br></br>
    <strong>Section 10</strong> | Powers to stop and search on suspicion.</br></br>
    <strong>Section 11</strong> | Powers to stop and search without suspicion.</br></br>
    <strong>Section 17</strong> | Exercise of police powers in relation to journalists etc.</br></br>
    <strong>Section 20</strong> | Serious disruption prevention order made on conviction.</br></br>
    `
  },   

  {
    "title": "Offences against the Person Act 1861",
    "content": `
    <strong>Section 4</strong> | Conspiring or soliciting to commit murder.</br></br>
    <strong>Section 5</strong> | Manslaughter.</br></br>
    <strong>Section 9</strong> | Murder or manslaughter abroad.</br></br>
    <strong>Section 16</strong> | Threats to kill.</br></br>
    <strong>Section 18</strong> | Shooting or attempting to shoot, or wounding with intent to do grievous bodily harm.</br></br>
    <strong>Section 20</strong> | Inflicting bodily injury, with or without weapon.</br></br>
    <strong>Section 21</strong> | Attempting to choke, &c. in order to commit any indictable offence.</br></br>
    <strong>Section 23</strong> | Maliciously administering poison, &c. so as to endanger life or inflict grievous bodily harm.</br></br>
    <strong>Section 24</strong> | Maliciously administering poison, &c. with intent to injure, aggrieve, or annoy any other person.</br></br>
    <strong>Section 27</strong> | Exposing children whereby life is endangered.</br></br>
    <strong>Section 28</strong> | Causing bodily injury by gunpowder.</br></br>
    <strong>Section 29</strong> | Causing gunpowder to explode, or sending to any person an explosive substance, or throwing corrosive fluid on a person, with intent to do grievous bodily harm.</br></br>
    <strong>Section 30</strong> | Placing gunpowder near a building, with intent to do bodily injury to any person.</br></br>
    <strong>Section 31</strong> | Setting spring guns, &c., with intent to inflict grievous bodily harm.</br></br>
    <strong>Section 36</strong> | Obstructing or assaulting a clergyman or other minister in the discharge of his duties.</br></br>
    <strong>Section 38</strong> | Assault with intent to commit felony, or on peace officers, &c.</br></br>
    <strong>Section 39</strong> | Assaults with intent to obstruct the sale of grain, or its free passage.</br></br>
    <strong>Section 40</strong> | Assaults on seamen, &c.</br></br>
    <strong>Section 41</strong> | Assaults</br></br>
    <strong>Section 42</strong> | Persons committing any common assault or battery may be imprisoned or compelled by two magistrates to pay fine and costs not exceeding 5 l.</br></br>
    <strong>Section 43</strong> | Persons convicted of aggravated assaults on females and boys under fourteen years of age may be imprisoned or fined.</br></br>
    <strong>Section 47</strong> | Assault occasioning bodily harm.</br></br>
    <strong>Section 56</strong> | Child-stealing.</br></br>
    `
  },   

  {
    "title": "Criminal Damage Act 1971",
    "content": `
    <strong>Section 1</strong> | Destroying or damaging property.</br></br>
    <strong>Section 2</strong> | Threats to destroy or damage property.</br></br>
    <strong>Section 3</strong> | Possessing anything with intent to destroy or damage property.</br></br>
    <strong>Section 6</strong> | Search for things intended for use in committing offences of criminal damage.</br></br>
    <strong>Section 9</strong> | Evidence in connection with offences under this Act.</br></br>
    `
  },   

  {
    "title": "Police Reform Act 2002",
    "content": `
    <strong>Section 54</strong> | Anti-social behaviour orders.</br></br>
    <strong>Section 56</strong> | Specimens taken from persons incapable of consenting.</br></br>
    <strong>Section 57</strong> | Use of specimens taken from persons incapable of consenting.</br></br>
    <strong>Section 58</strong> | Equivalent provision for offences connected with transport systems.</br></br>
    <strong>Section 59</strong> | Vehicles used in manner causing alarm, distress or annoyance.</br></br>
    <strong>Section 60</strong> | Retention etc. of vehicles seized under section 59.</br></br>
    <strong>Section 61</strong> | Anti-social behaviour orders.</br></br>
    <strong>Section 67</strong> | Sex offenders: England and Wales.</br></br>
    <strong>Section 68</strong> | Interim orders for sex offenders: England and Wales.</br></br>
    `
  },   

  {
    "title": "Firearms Act 1968",
    "content": `
    <strong>Section 1</strong> | Requirement of firearm certificate.</br></br>
    <strong>Section 2</strong> | Requirement of certificate for possession of shotguns.</br></br>
    <strong>Section 3</strong> | Business and other transactions with firearms and ammunition.</br></br>
    <strong>Section 5</strong> | Weapons subject to general prohibition.</br></br>
    <strong>Section 6</strong> | Power to prohibit movement of arms and ammunition.</br></br>
    <strong>Section 7</strong> | Police permit.</br></br>
    <strong>Section 8</strong> | Authorised dealing with firearms.</br></br>
    <strong>Section 10</strong> | Slaughter of animals.</br></br>
    <strong>Section 16</strong> | Possession of firearm with intent to injure.</br></br>
    <strong>Section 16A</strong> | Possession of firearm with intent to cause fear of violence.</br></br>
    <strong>Section 17</strong> | Use of firearm to resist arrest.</br></br>
    <strong>Section 18</strong> | Carrying firearm with criminal intent.</br></br>
    <strong>Section 19</strong> | Carrying firearm in a public place.</br></br>
    <strong>Section 19A</strong> | Having small-calibre pistol outside premises of licensed pistol club.</br></br>
    <strong>Section 20</strong> | Trespassing with firearm.</br></br>
    <strong>Section 21</strong> | Possession of firearms by persons previously convicted of crime.</br></br>
    <strong>Section 21A</strong> | Firing an air weapon beyond premises.</br></br>
    <strong>Section 22</strong> | Acquisition and possession of firearms by minors.</br></br>
    <strong>Section 24</strong> | Supplying firearms to minors.</br></br>
    <strong>Section 24ZA</strong> | Failing to prevent minors from having air weapons.</br></br>
    <strong>Section 24A</strong> | Supplying imitation firearms to minors.</br></br>
    <strong>Section 25</strong> | Supplying firearm to person drunk or insane.</br></br>
    <strong>Section 30</strong> | Revocation of certificates.</br></br>
    <strong>Section 31</strong> | Certificate for prohibited weapon.</br></br>
    <strong>Section 32</strong> | Certificate for prohibited weapon.</br></br>
    <strong>Section 46</strong> | Power of search with warrant.</br></br>
    <strong>Section 47</strong> | Powers of constables to stop and search.</br></br>
    <strong>Section 48</strong> | Production of certificates.</br></br>
    <strong>Section 57</strong> | Exception for airsoft guns.</br></br>
    `
  },   

  {
    "title": "Criminal Justice Act 1988",
    "content": `
    <strong>Section 139</strong> | Offence of having article with blade or point in public place.</br></br>
    <strong>Section 139AA</strong> | Offence of threatening with article with blade or point or offensive weapon.</br></br>
    <strong>Section 139B</strong> | Power of entry to search for articles with a blade or point and offensive weapons.</br></br>
    `
  },   

  {
    "title": "Terrorism Act 2000",
    "content": `
    <strong>Section 43</strong> | Search of persons.</br></br>
    <strong>Section 43A</strong> | Search of vehicles.</br></br>
    <strong>Section 81</strong> | Arrest of suspected terrorists: power of entry.</br></br>
    <strong>Section 82</strong> | Arrest and seizure: constables.</br></br>
    <strong>Section 116</strong> | Powers to stop and search.</br></br>
    `
  },   

  {
    "title": "Theft Act 1968",
    "content": `
    <strong>Section 7</strong> | Theft.</br></br>
    <strong>Section 8</strong> | Robbery.</br></br>
    <strong>Section 9</strong> | Burglary.</br></br>
    <strong>Section 10</strong> | Aggravated burglary.</br></br>
    <strong>Section 11</strong> | Removal of articles from places open to the public.</br></br>
    <strong>Section 12</strong> | Taking motor vehicle or other conveyance without authority.</br></br>
    <strong>Section 12A</strong> | Aggravated vehicle-taking.</br></br>
    <strong>Section 21</strong> | Blackmail.</br></br>
    <strong>Section 22</strong> | Handling stolen goods.</br></br>
    <strong>Section 25</strong> | Going equipped for stealing, etc.</br></br>
    <strong>Section 26</strong> | Search for stolen goods.</br></br>
    <strong>Section 27</strong> | Evidence and procedure on charge of theft or handling stolen goods.</br></br>
    `
  },   

  {
    "title": "Police Act 1996",
    "content": `
    <strong>Section 89</strong> | Assaults on constables.</br></br>
    <strong>Section 89(2)</strong> | Resisting or wilfully obstructing a constable in the execution of his duty.</br></br>
    <strong>Section 90</strong> | Impersonation, etc.</br></br>
    `
  },   

  {
    "title": "Sexual Offenders Act 2003",
    "content": `
    <strong>Section 1</strong> | Rape.</br></br>
    <strong>Section 3</strong> | Sexual assault.</br></br>
    <strong>Section 66</strong> | Exposure.</br></br>
    <strong>Section 71</strong> | Sexual activity in a public lavatory.</br></br>
    `
  },   

  {
    "title": "Criminal Law Act 1967",
    "content": `
    <strong>Section 2</strong> | Arrest without warrant.</br></br>
    <strong>Section 3</strong> | Use of force in making arrest.</br></br>
    <strong>Section 4</strong> | Penalties for assisting offenders.</br></br>
    <strong>Section 5</strong> | Penalties for concealing offences or giving false information.</br></br>
    `
  },   

  {
    "title": "Mental Health Act 1983",
    "content": `
    <strong>Section 2</strong> | Admission for Assessment.</br></br>
    <strong>Section 3</strong> | Admission for Treatment.</br></br>
    <strong>Section 38</strong> | Powers Of Courts to Order Hospital Admission or Guardianship.</br></br>
    <strong>Section 135</strong> | Warrant to Search for and Remove Patients.</br></br>
    <strong>Section 136</strong> | Removal etc of mentally disordered persons without a warrant.</br></br>
    `
  },
  
  {
    "title": "Protection from Harassment Act 1997",
    "content": `
<strong>Section 1</strong> | Prohibition of harassment.</br></br>
<strong>Section 2</strong> | Offence of harassment.</br></br>
<strong>Section 2A</strong> | Offence of stalking.</br></br>
<strong>Section 2B</strong> | Power of entry in relation to offence of stalking.</br></br>
<strong>Section 4</strong> | Putting people in fear of violence.</br></br>
<strong>Section 4A</strong> | Stalking involving fear of violence or serious alarm or distress.</br></br>
<strong>Section 5</strong> | Restraining orders on conviction.</br></br>
<strong>Section 5A</strong> | Restraining orders on acquittal.</br></br>
    `
  },   

  {
    "title": "Mental Capacity Act 2005",
    "content": `
    <strong>Section 5</strong> | Acts in connection with care or treatment.</br></br>
    <strong>Section 6</strong> | Limitations - Use of force.</br></br>
    <strong>Section 44</strong> | Treatment or Neglect.</br></br>
    `
  },   

  {
    "title": "Regulation of Investigatory Powers Act 2000",
    "content": `
    <strong>Section 1</strong> | Unlawful interception.</br></br>
    <strong>Section 3</strong> | Lawful interception without an interception warrant.</br></br>
    <strong>Section 4</strong> | Power to provide for lawful interception.</br></br>
    <strong>Section 5</strong> | Interception with a warrant.</br></br>
    <strong>Section 6</strong> | Application for issue of an interception warrant.</br></br>
    <strong>Section 7</strong> | Issue of warrants.</br></br>
    <strong>Section 19</strong> | Offence for unauthorised disclosures.</br></br>
    <strong>Section 27</strong> | Lawful surveillance etc.</br></br>
    <strong>Section 28</strong> | Authorisation of directed surveillance.</br></br>
    <strong>Section 29</strong> | Authorisation of covert human intelligence sources.</br></br>
    <strong>Section 29A</strong> | Section 29: supplementary provision in relation to relevant collaborative units.</br></br>
    <strong>Section 29B</strong> | Covert human intelligence sources: criminal conduct authorisations.</br></br>
    <strong>Section 29C</strong> | Criminal conduct authorisations: safeguards for juveniles.</br></br>
    <strong>Section 29D</strong> | Criminal conduct authorisations: safeguards for vulnerable adults.</br></br>
    <strong>Section 32</strong> | Authorisation of intrusive surveillance.</br></br>
    <strong>Section 53</strong> | Failure to comply with a notice.</br></br>
    <strong>Section 54</strong> | Tipping-off.</br></br>
    `
  }, 

  {
    "title": "Prevention of Crime Act 1953",
    "content": `
    <strong>Section 1</strong> | Prohibition of the carrying of offensive weapons without lawful authority or reasonable excuse.</br></br>
    <strong>Section 1A</strong> | Offence of threatening with offensive weapon in public.</br></br>
    `
  }, 

  {
    "title": "Computer Misuse Act 1990",
    "content": `
    <strong>Section 1</strong> | Unauthorised access to computer material.</br></br>
    <strong>Section 2</strong> | Unauthorised access with intent to commit or facilitate commission of further offences.</br></br>
    <strong>Section 3</strong> | Unauthorised acts with intent to impair, or with recklessness as to impairing, operation of computer, etc.</br></br>
    <strong>Section 3ZA</strong> | Unauthorised acts causing, or creating risk of, serious damage.</br></br>
    <strong>Section 3A</strong> | Making, supplying or obtaining articles for use in offence under section 1, 3 or 3ZA.</br></br>
    `
  }, 

  {
    "title": "Animal Welfare Act 2006",
    "content": `
    <strong>Section 2</strong> | ”Protected Animals.”</br></br>
    <strong>Section 3</strong> | Responsibility for animals.</br></br>
    <strong>Section 4</strong> | Unnecessary suffering.</br></br>
    <strong>Section 6</strong> | Docking of dogs' tails.</br></br>
    <strong>Section 7</strong> | Administration of poisons etc.</br></br>
    <strong>Section 8</strong> | Fighting etc.</br></br>
    <strong>Section 9</strong> | Duty of person responsible for animal to ensure welfare.</br></br>
    <strong>Section 13</strong> | Licensing or registration of activities involving animals.</br></br>
    <strong>Section 18</strong> | Powers in relation to animals in distress.</br></br>
    <strong>Section 19</strong> | Power of entry for section 18 purposes.</br></br>
    <strong>Section 20</strong> | Orders in relation to animals taken under section 18(5).</br></br>
    <strong>Section 22</strong> | Seizure of animals involved in fighting offences.</br></br>
    <strong>Section 23</strong> | Entry and search under warrant in connection with offences.</br></br>
    <strong>Section 24</strong> | Entry for purposes of arrest.</br></br>
    <strong>Section 30</strong> | Power of local authority to prosecute offences.</br></br>
    <strong>Section 32</strong> | Imprisonment or fine.</br></br>
    <strong>Section 35</strong> | Seizure of animals in connection with disqualification.</br></br>
    `
  }, 

  {
    "title": "Forgery and Counterfeiting Act 1981",
    "content": `
    <strong>Section 1</strong> | Offence of forgery.</br></br>
    <strong>Section 2</strong> | Offence of copying a false instrument.</br></br>
    <strong>Section 3</strong> | Offence of using a false instrument.</br></br>
    <strong>Section 4</strong> | Offence of using a copy of a false instrument.</br></br>
    <strong>Section 14</strong> | Offences of counterfeiting notes and coins.</br></br>
    <strong>Section 15</strong> | Offences of passing etc. counterfeit notes and coins.</br></br>
    <strong>Section 16</strong> | Offences involving the custody or control of counterfeit notes and coins.</br></br>
    <strong>Section 17</strong> | Offences involving the making or custody or control of counterfeiting materials and implements.</br></br>
    <strong>Section 18</strong> | Offence of reproducing British currency notes.</br></br>
    <strong>Section 19</strong> | Offences of making etc. imitation British coins.</br></br>
    <strong>Section 20</strong> | Prohibition of importation of counterfeit notes and coins.</br></br>
    <strong>Section 21</strong> | Prohibition of exportation of counterfeit notes and coins.</br></br>
    `
  }, 

  {
    "title": "Fire and Rescue Services Act 2004",
    "content": `
    <strong>Section 37</strong> | Prohibition on employment of police in fire-fighting.</br></br>
    <strong>Section 38</strong> | Duty to secure water supply etc.</br></br>
    <strong>Section 39</strong> | Supply of water by water undertakers.</br></br>
    <strong>Section 40</strong> | Emergency supply by water undertaker.</br></br>
    <strong>Section 41</strong> | Supply by other persons.</br></br>
    <strong>Section 42</strong> | Fire hydrants.</br></br>
    <strong>Section 43</strong> | Notice of works affecting water supply and fire hydrants.</br></br>
    <strong>Section 44</strong> | Powers of fire-fighters etc in an emergency etc.</br></br>
    `
  }, 

  {
    "title": "Malicious Communications Act 1988",
    "content": `
    <strong>Section 1</strong> | Offence of sending letters etc. with intent to cause distress or anxiety.</br></br>
    `
  },
  
  {
    "title": "Criminal Attempts Act 1981",
    "content": `
    <strong>Section 1</strong> | Attempting to commit an offence.</br></br>

    <strong>Section 3</strong> | Offences of attempt under other enactments.</br></br>
    
    <strong>Section 8</strong> | Abolition of offence of loitering etc. with intent.</br></br>
    
    <strong>Section 9</strong> | Interference with vehicles.</br></br>    `
  }, 

  {
    "title": "Anti-social Behaviour, Crime and Policing Act 2014",
    "content": `
    <strong>Section 1</strong> | Power to grant injunctions.</br></br>

    <strong>Section 4</strong> | Power of arrest.</br></br>
    
    <strong>Section 9</strong> | Arrest without warrant.</br></br>
    
    <strong>Section 10</strong> | Issue of arrest warrant.</br></br>
    
    <strong>Section 13</strong> | Power to exclude person from home in cases of violence or risk of harm.</br></br>
    
    <strong>Section 22</strong> | Power to make orders.</br></br>
    
    <strong>Section 30</strong> | Breach of order.</br></br>
    
    <strong>Section 34</strong> | Authorisations to use powers under section 35.</br></br>
    
    <strong>Section 35</strong> | Directions excluding a person from an area.</br></br>
    
    <strong>Section 36</strong> | Restrictions.</br></br>
    
    <strong>Section 37</strong> | Surrender of property.</br></br>
    
    <strong>Section 38</strong> | Record-keeping.</br></br>
    
    <strong>Section 39</strong> | Offences.</br></br>
    
    <strong>Section 43</strong> | Power to issue notices.</br></br>
    
    <strong>Section 44</strong> | Occupiers of premises etc.</br></br>
    
    <strong>Section 45</strong> | Occupier or owner unascertainable.</br></br>
    
    <strong>Section 46</strong> | Appeals against notices.</br></br>
    
    <strong>Section 48</strong> | Offence of failing to comply with notice.</br></br>
    
    <strong>Section 51</strong> | Seizure of item used in commission of offence.</br></br>
    
    <strong>Section 59</strong> | Power to make orders.</br></br>
    
    <strong>Section 63</strong> | Consumption of alcohol in breach of prohibition in order.</br></br>
    
    <strong>Section 67</strong> | Offence of failing to comply with order.</br></br>
    
    <strong>Section 76</strong> | Power to issue closure notices.</br></br>
    
    <strong>Section 98</strong> | Conduct causing nuisance to landlord etc.</br></br>
    
    <strong>Section 99</strong> | Offences connected with riot.</br></br>
    
    <strong>Section 106</strong> | Keeping dogs under proper control.</br></br>
    
    <strong>Section 147</strong> | Powers to seize invalid passports etc.</br></br>`
  }, 

  {
    "title": "Dangerous Dogs Act 1991",
    "content": `
    <strong>Section 1</strong> | Dogs bred for fighting.</br></br>

    <strong>Section 3</strong> | Keeping dogs under proper control.</br></br>
    
    <strong>Section 5</strong> | Seizure, entry of premises and evidence.</br></br>
    
    <strong>Section 6</strong> | Dogs owned by young persons.</br></br>
    
    <strong>Section 7</strong> | Muzzling and leads.</br></br>
    `
  }, 

  {
    "title": "Fraud Act 2006",
    "content": `
    <strong>Section 1</strong> | Fraud.</br></br>

    <strong>Section 2</strong> | Fraud by false representation.</br></br>
    
    <strong>Section 3</strong> | Fraud by failing to disclose information.</br></br>
    
    <strong>Section 4</strong> | Fraud by abuse of position.</br></br>
    
    <strong>Section 6</strong> | Possession etc. of articles for use in frauds.</br></br>
    
    <strong>Section 7</strong> | Making or supplying articles for use in frauds.</br></br>
    
    <strong>Section 9</strong> | Participating in fraudulent business carried on by sole trader etc.</br></br>
    `
  },
  
  {
    "title": "Bribery Act 2010",
    "content": `
    <strong>Section 1</strong> | Offences of bribing another person.</br></br>

    <strong>Section 2</strong> | Offences relating to being bribed.</br></br>
    
    <strong>Section 3</strong> | Function or activity to which bribe relates.</br></br>
    
    <strong>Section 4</strong> | Improper performance to which bribe relates.</br></br>
    
    <strong>Section 6</strong> | Bribery of foreign public officials.</br></br>
    
    <strong>Section 7</strong> | Failure of commercial organisations to prevent bribery.</br></br>
    `
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

