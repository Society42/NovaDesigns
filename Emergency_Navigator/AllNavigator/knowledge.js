const searchInput = document.getElementById("search-input");
const articleContainer = document.getElementById("article-container");
const articleDetails = document.getElementById("article-details");
const backButton = document.createElement("div");
backButton.classList.add("back-button");
backButton.textContent = "Go back";

// Sample designer data
const designers = [
  {
    name: "John Doe",
    description: "Talented designer with a passion for creativity.",
    work: [
      {
        projectName: "Project 1",
        imageUrl: "path/to/project1-image.jpg",
        description: "Description of Project 1",
      },
      {
        projectName: "Project 2",
        imageUrl: "path/to/project2-image.jpg",
        description: "Description of Project 2",
      },
      {
        projectName: "Project 3",
        imageUrl: "path/to/project3-image.jpg",
        description: "Description of Project 3",
      },
    ],
  },
  // Add more designers as needed
];

const partnersContent = `
  <p>We are proud to collaborate with the following partners who share our vision and values:</p>
  <ul>
  <li>Axon Studios, Collabed with British London Roleplay | VC |.</li>
  <li>Axon Studios, Collabed with United Kingdom Leicester City Roleplay | VC Only.</li>
  <li>Axon Studios, Partnered with New York City Roleplay.</li>
  <li>Axon Studios, Partnered with Studio 360.</li>
  <li>Axon Studios, Partnered with Exotic Designs.</li>
  </ul>
`;

const faqContent = `
  <p>Have questions? We have answers! Explore our frequently asked questions below.</p>
  <ul>
    <li>Q: How can I purchase a product?</li>
    <li>A: All products we sell are sold on our hub, even free product.</li>

  </ul>
`;

designers.push(
);

// Content for the "Portfolios" section
const portfoliosContent = `
  <p>Explore our amazing projects and portfolios showcasing our skills and expertise.</p>
  ${designers
    .map(
      (designer, index) => `
        <div class="portfolio">
          <h2>${designer.name}</h2>
          <p>${designer.description}</p>
          <div class="work-gallery">
            ${designer.work
              .map(
                (project) => `
                  <div class="project">
                    <img src="${project.imageUrl}" alt="${project.projectName}" />
                    <h3>${project.projectName}</h3>
                    <p>${project.description}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `
    )
    .join("")}
`;

function displayContent(contentToShow) {
  articleContainer.innerHTML = "";
  contentToShow.forEach((content, index) => {
    const contentElement = document.createElement("div");
    contentElement.classList.add("article");
    contentElement.innerHTML = `
        <h2>${content.title}</h2>
        <p>${content.content}</p>
    `;
    contentElement.addEventListener("click", function () {
      if (content.designerIndex !== undefined) {
        displayDesignerDetails(content.designerIndex);
        updateURL(content.designerIndex);
      } else {
        displayContent(contentToShow); // Clicking on default content resets to default
        updateURL(); // Reset URL to remove designer index parameter
      }
    });
    articleContainer.appendChild(contentElement);
  });
}

// Function to display designer details
function displayDesignerDetails(index) {
  const designer = designers[index];
  articleDetails.innerHTML = `
      <h2>${designer.name}</h2>
      <p>${designer.description}</p>
      <div class="work-gallery">
        ${designer.work
          .map(
            (project) => `
                <div class="project">
                  <img src="${project.imageUrl}" alt="${project.projectName}" />
                  <h3>${project.projectName}</h3>
                  <p>${project.description}</p>
                </div>
              `
          )
          .join("")}
      </div>
  `;
  articleDetails.style.display = "block";
  articleContainer.style.display = "none";
  articleDetails.appendChild(backButton);
}

// Event listener for back button
backButton.addEventListener("click", function () {
  articleDetails.style.display = "none";
  articleContainer.style.display = "block";
  updateURL();
});

// Event listener for search input
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredDesigners = designers.filter(
    (designer) =>
      designer.name.toLowerCase().includes(searchTerm) ||
      designer.description.toLowerCase().includes(searchTerm) ||
      designer.work.some((project) =>
        project.projectName.toLowerCase().includes(searchTerm)
      ) ||
      designer.work.some((project) =>
        project.description.toLowerCase().includes(searchTerm)
      )
  );
  displayDesigners(filteredDesigners);
  updateURL();
});

// Function to update the URL based on the designer index
function updateURL(index) {
  const designerId = index !== undefined ? index + 1 : "";
  const url =
    window.location.origin +
    window.location.pathname +
    (designerId ? `?designer=${designerId}` : "");
  window.history.pushState({}, "", url);
}

// Get the designer index from the URL query parameter, if present
function getDesignerIndexFromURL() {
  const params = new URLSearchParams(window.location.search);
  const designerId = params.get("designer");
  return designerId ? parseInt(designerId) - 1 : null;
}

// Display all content initially
const defaultContent = [
  { title: "Partners", content: partnersContent },
  { title: "FAQ", content: faqContent },
  // Add more default content as needed
];

// Display default content by default
displayContent(defaultContent);

// Check if there's a designer index in the URL and display the corresponding designer details
const designerIndexFromURL = getDesignerIndexFromURL();
if (
  designerIndexFromURL !== null &&
  designerIndexFromURL >= 0 &&
  designerIndexFromURL < designers.length
) {
  displayDesignerDetails(designerIndexFromURL);
}
