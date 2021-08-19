//global var
const ul = document.querySelector("#navbar__list");

//this creates new elements
const elementCreator = (element, attributes) => {
  const elementContainer = document.createElement(element);
    if(!(attributes == undefined)){
      const element_attributes = attrCreator(elementContainer, attributes);
      return element_attributes;
    } else {
      return elementContainer;
    }
};

//this add attributes to the elements created by the elementCreator
const attrCreator = (element_tag, attributesObj) => {
  if(!(attributesObj == undefined)){
    const attributes = Object.entries(attributesObj);
    for(let i=0; i < attributes.length; i++){
      const attr = document.createAttribute(attributes[i][0]);
      attr.value = attributes[i][1];
      element_tag.setAttributeNode(attr);
    }
  }
  return element_tag;
};

//this adds a class to the section element
const addClass = (element_target, class_name) => {
  const section = document.querySelector(element_target.hash);
  section.classList.add(class_name);
};

//this removes a class from the section element
const removeClass = (class_name) => {
  const sections = document.querySelectorAll("section");
  for (section of sections) {
    section.classList.remove(class_name);
  }
};

//this finds the y coordinates of the nav element
const el_location = (element) => {
  let bodyElem = document.body.getBoundingClientRect().top;
  let element_section = element.getBoundingClientRect().top;
  let area_offset = element_section - bodyElem;
  return area_offset;
}

//this shows which link is active/on scroll
//tied to section id's as anchors
const section_scrolling = () => {
  const section_elements = document.querySelectorAll("section");
  const section_points = [];
  for (section_element of section_elements){
    section_points.push(el_location(section_element));
  }
  return section_points;
}

//this builds the nav list
const navAdder = () => {
  const section = document.querySelectorAll("section");
  for (let i = 0; i < section.length; i++) {
    const liTag = elementCreator("li");
    const aTag = elementCreator("a", {"href": `#section${i + 1}`});
    aTag.className = "menu__link";
    aTag.textContent =`Album ${i+1}`;
    liTag.appendChild(aTag);
    ul.appendChild(liTag);
  }
};

//this adds the fourth section dynamically
const section_content = ()=>{
  const main = document.querySelector("main");
  const section_new = elementCreator("section", {"id":"section4", "data-nav":"Section 4", "class":"your-active-class"});
  const div_new = elementCreator("div");
  const h2_new = elementCreator("h2");
  const p_new = elementCreator("p");
  div_new.className = "landing__container";
  h2_new.textContent = "The Pixies - Doolittle";
  p_new.textContent = `"After 1988's brilliant but abrasive Surfer Rosa, the Pixies' sound
    couldn't get much more extreme. Their Elektra debut, Doolittle, reins in the noise in
    favor of pop songcraft and accessibility. Producer Gil Norton's sonic sheen adds some
    polish, but Black Francis' tighter songwriting focuses the group's attack. Doolittle's
    most ferocious moments, like "Dead," a visceral retelling of David and Bathsheba's affair
    -- are more stylized than the group's past outbursts. Meanwhile, their poppy side
    surfaces on the irresistible single "Here Comes Your Man" and the sweetly surreal love
    song "La La Love You." The Pixies' arty, noisy weirdness mix with just enough hooks to
    produce gleefully demented singles like "Debaser," -- inspired by Bunuel's classic surrealist
    short Un Chien Andalou -- and "Wave of Mutilation," their surfy ode to driving a car
    into the sea. Though Doolittle's sound is cleaner and smoother than the Pixies' earlier
    albums, there are still plenty of weird, abrasive vignettes: the blankly psychotic "There
    Goes My Gun," "Crackity Jones," a song about a crazy roommate Francis had in Puerto Rico,
    and the nihilistic finale "Gouge Away." Meanwhile, "Tame," and "I Bleed" continue the Pixies'
    penchant for cryptic kink. But the album doesn't just refine the Pixies' sound; they also
    expand their range on the brooding, wannabe spaghetti western theme "Silver" and the strangely
    theatrical "Mr. Grieves." "Hey" and "Monkey Gone to Heaven," on the other hand, stretch
    Francis' lyrical horizons: "Monkey"'s elliptical environmentalism and "Hey"'s twisted longing
    are the Pixies' versions of message songs and romantic ballads. Their most accessible album,
    Doolittle's wide-ranging moods and sounds make it one of their most eclectic and ambitious.
    A fun, freaky alternative to most other late-'80s college rock, it's easy to see why the
    album made the Pixies into underground rock stars. - AllMusic.com"`
  div_new.appendChild(h2_new);
  div_new.appendChild(p_new);
  section_new.appendChild(div_new);
  main.appendChild(section_new);
}

//this scrolls the page when link is clicked
const click_nav_link = (event)=>{
  if(event.target.className == "menu__link"){
    const section_element = document.querySelector(event.target.hash);
    const section_top = el_location(section_element);
    window.scrollTo({top:section_top, behavior: "smooth"});
    removeClass("your-active-class");
    addClass(event.target, "your-active-class");
  }
}

//this changes the selects/styles the nav list when scrolling through sections
const scroll_active_links = ()=>{
  const section_points = section_scrolling();
  for(let i = 0; i < section_points.length; i++){
    const links = document.querySelectorAll(".menu__link");
    if(window.scrollY >= section_points[i] && !(window.scrollY > section_points[i+1])){
      links[i].style.cssText = "background-color: rgba(0, 0, 0, 0.85); color: white;";
    }else{
      links[i].style.cssText = "background-color: rgb(216, 216, 195);";
    }
  }
}

//scroll to top button JS
mybutton = document.getElementById("myBtn");

// this shows the button after a given amount of space
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 140 || document.documentElement.scrollTop > 140) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

//this scrolls to the top of the page when button is clicked
function topFunction() {
  document.body.scrollTop = 0; //safari
  document.documentElement.scrollTop = 0; //chrome, FF, ie, opera
}

//load the section content function first (in the capture phase)
window.addEventListener("DOMContentLoaded", section_content, true);

//load the navElementAdder function second in the bubbling phase
window.addEventListener("DOMContentLoaded", navAdder);

//Scroll to section on link click
document.addEventListener('click', click_nav_link);

//listen for a scroll event
window.addEventListener("scroll", scroll_active_links);
