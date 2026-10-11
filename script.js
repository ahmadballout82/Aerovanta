document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */

  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");

  const navLinks = document.querySelectorAll(".nav-link");

  const charterForm = document.getElementById("charterForm");
  const formMessage = document.getElementById("formMessage");

  const departureInput = document.getElementById("departure");
  const returnInput = document.getElementById("returnDate");
  const destinationInput = document.getElementById("to");

  const destinationCards = document.querySelectorAll(".destination-card");

  const destinationModal = document.getElementById("destinationModal");
  const destinationModalClose = document.getElementById("destinationModalClose");
  const destinationModalBackdrop = document.querySelector(
    ".destination-modal-backdrop"
  );

  const modalDestinationImage = document.getElementById(
    "modalDestinationImage"
  );

  const modalDestinationCountry = document.getElementById(
    "modalDestinationCountry"
  );

  const modalDestinationName = document.getElementById(
    "modalDestinationName"
  );

  const modalDestinationDescription = document.getElementById(
    "modalDestinationDescription"
  );

  const modalDestinationAirports = document.getElementById(
    "modalDestinationAirports"
  );

  const modalDestinationAircraft = document.getElementById(
    "modalDestinationAircraft"
  );

  const modalCharterButton = document.getElementById(
    "modalCharterButton"
  );

  let selectedDestination = "";


  /* =========================
     CURRENT YEAR
  ========================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =========================
     MOBILE MENU
  ========================= */

  const setMenuIcon = (isOpen) => {

    if (!menuToggle) return;

    const icon = menuToggle.querySelector("i");

    if (!icon) return;

    icon.className = isOpen
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  };


  const openMenu = () => {

    if (!navbar) return;

    navbar.classList.add("open");
    document.body.classList.add("menu-open");

    setMenuIcon(true);
  };


  const closeMenu = () => {

    if (!navbar) return;

    navbar.classList.remove("open");
    document.body.classList.remove("menu-open");

    setMenuIcon(false);
  };


  if (menuToggle && navbar) {

    menuToggle.addEventListener("click", (event) => {

      event.stopPropagation();

      if (navbar.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }

    });

  }


  navLinks.forEach((link) => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });


  const navCharter = document.querySelector(".nav-charter");

  if (navCharter) {

    navCharter.addEventListener("click", () => {
      closeMenu();
    });

  }


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeMenu();

      if (
        destinationModal &&
        destinationModal.classList.contains("open")
      ) {
        closeDestinationModal();
      }

    }

  });


  document.addEventListener("click", (event) => {

    if (!navbar || !menuToggle) return;

    const clickedInsideMenu = navbar.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (
      navbar.classList.contains("open") &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {
      closeMenu();
    }

  });


  window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
      closeMenu();
    }

  });


  /* =========================
     STICKY HEADER
  ========================= */

  const handleHeader = () => {

    if (!header) return;

    if (window.scrollY > 120) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };


  handleHeader();

  window.addEventListener("scroll", handleHeader);


  /* =========================
     SMOOTH SCROLL
  ========================= */

  const scrollToElement = (target) => {

    if (!target) return;

    const headerHeight = header
      ? header.offsetHeight
      : 0;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  };


  const internalLinks = document.querySelectorAll('a[href^="#"]');


  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      scrollToElement(target);

    });

  });


  /* =========================
     ACTIVE NAVIGATION
  ========================= */

  const sections = document.querySelectorAll("section[id]");


  const updateActiveNavigation = () => {

    let currentSection = "";

    const scrollPosition =
      window.scrollY + 220;


    sections.forEach((section) => {

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }

    });


    navLinks.forEach((link) => {

      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }

    });

  };


  updateActiveNavigation();

  window.addEventListener(
    "scroll",
    updateActiveNavigation
  );


  /* =========================
     BACK TO TOP
  ========================= */

  const handleBackToTop = () => {

    if (!backToTop) return;

    if (window.scrollY > 600) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

  };


  handleBackToTop();

  window.addEventListener(
    "scroll",
    handleBackToTop
  );


  if (backToTop) {

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =========================
     DESTINATION MODAL
  ========================= */

  const openDestinationModal = (card) => {

    if (!destinationModal || !card) return;

    const destination =
      card.dataset.destination || "";

    const country =
      card.dataset.country || "";

    const airports =
      card.dataset.airports || "";

    const description =
      card.dataset.duration || "";

    const aircraft =
      card.dataset.aircraft || "";

    const image =
      card.dataset.image || "";


    selectedDestination = destination;


    if (modalDestinationName) {
      modalDestinationName.textContent = destination;
    }


    if (modalDestinationCountry) {
      modalDestinationCountry.textContent = country;
    }


    if (modalDestinationAirports) {
      modalDestinationAirports.textContent = airports;
    }


    if (modalDestinationDescription) {
      modalDestinationDescription.textContent = description;
    }


    if (modalDestinationAircraft) {
      modalDestinationAircraft.textContent = aircraft;
    }


    if (modalDestinationImage) {

      modalDestinationImage.src = image;

      modalDestinationImage.alt =
        `${destination} private aviation`;

    }


    destinationModal.classList.add("open");

    destinationModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("modal-open");


    setTimeout(() => {

      if (destinationModalClose) {
        destinationModalClose.focus();
      }

    }, 150);

  };


  const closeDestinationModal = () => {

    if (!destinationModal) return;

    destinationModal.classList.remove("open");

    destinationModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove("modal-open");

  };


  destinationCards.forEach((card) => {

    card.addEventListener("click", (event) => {

      const clickedButton =
        event.target.closest(".destination-button");

      if (
        clickedButton ||
        event.target.closest(".destination-card")
      ) {
        openDestinationModal(card);
      }

    });


    card.addEventListener("keydown", (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openDestinationModal(card);

      }

    });

  });


  if (destinationModalClose) {

    destinationModalClose.addEventListener(
      "click",
      closeDestinationModal
    );

  }


  if (destinationModalBackdrop) {

    destinationModalBackdrop.addEventListener(
      "click",
      closeDestinationModal
    );

  }


  /* =========================
     REQUEST DESTINATION
  ========================= */

  if (modalCharterButton) {

    modalCharterButton.addEventListener(
      "click",
      () => {

        if (
          selectedDestination &&
          destinationInput
        ) {

          destinationInput.value =
            selectedDestination;

        }


        closeDestinationModal();


        const charterSection =
          document.getElementById("charter");


        setTimeout(() => {

          scrollToElement(charterSection);


          setTimeout(() => {

            if (destinationInput) {

              destinationInput.focus();

              destinationInput.classList.add(
                "destination-selected"
              );


              setTimeout(() => {

                destinationInput.classList.remove(
                  "destination-selected"
                );

              }, 1400);

            }

          }, 700);

        }, 200);

      }
    );

  }


  /* =========================
     FLEET REQUEST BUTTONS
  ========================= */

  const fleetRequestLinks =
    document.querySelectorAll(
      '.fleet-content > a[href="#charter"]'
    );


  fleetRequestLinks.forEach((link) => {

    link.addEventListener("click", () => {

      const fleetCard =
        link.closest(".fleet-card");

      const aircraftName =
        fleetCard
          ?.querySelector(".fleet-title h3")
          ?.textContent.trim();


      const aircraftSelect =
        document.getElementById("aircraft");


      if (
        aircraftSelect &&
        aircraftName
      ) {

        const matchingOption =
          Array.from(
            aircraftSelect.options
          ).find(
            (option) =>
              option.value === aircraftName
          );


        if (matchingOption) {
          aircraftSelect.value =
            aircraftName;
        }

      }

    });

  });


  /* =========================
     DATE SETTINGS
  ========================= */

  const today = new Date();

  const localToday =
    `${today.getFullYear()}-` +
    `${String(today.getMonth() + 1).padStart(2, "0")}-` +
    `${String(today.getDate()).padStart(2, "0")}`;


  if (departureInput) {
    departureInput.min = localToday;
  }


  if (returnInput) {
    returnInput.min = localToday;
  }


  if (
    departureInput &&
    returnInput
  ) {

    departureInput.addEventListener(
      "change",
      () => {

        if (!departureInput.value) return;

        returnInput.min =
          departureInput.value;


        if (
          returnInput.value &&
          returnInput.value <
          departureInput.value
        ) {

          returnInput.value = "";

        }

      }
    );

  }


  /* =========================
     FORM HELPERS
  ========================= */

  const showFormMessage = (
    message,
    success = false
  ) => {

    if (!formMessage) return;

    formMessage.textContent = message;

    formMessage.style.color =
      success
        ? "#2f7d55"
        : "#b54848";

  };


  const validEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  };


  const validPhone = (phone) => {

    const digits =
      phone.replace(/\D/g, "");

    return digits.length >= 7;

  };


  /* =========================
     CHARTER FORM
  ========================= */

  if (charterForm) {

    charterForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const from =
          document
            .getElementById("from")
            ?.value.trim();


        const to =
          document
            .getElementById("to")
            ?.value.trim();


        const departure =
          departureInput?.value;


        const returnDate =
          returnInput?.value;


        const passengers =
          document
            .getElementById("passengers")
            ?.value;


        const name =
          document
            .getElementById("name")
            ?.value.trim();


        const phone =
          document
            .getElementById("phone")
            ?.value.trim();


        const email =
          document
            .getElementById("email")
            ?.value.trim();


        if (
          !from ||
          !to ||
          !departure ||
          !passengers ||
          !name ||
          !phone ||
          !email
        ) {

          showFormMessage(
            "Please complete all required fields."
          );

          return;
        }


        if (!validEmail(email)) {

          showFormMessage(
            "Please enter a valid email address."
          );

          return;
        }


        if (!validPhone(phone)) {

          showFormMessage(
            "Please enter a valid phone number."
          );

          return;
        }


        if (departure < localToday) {

          showFormMessage(
            "Departure date cannot be in the past."
          );

          return;
        }


        if (
          returnDate &&
          returnDate < departure
        ) {

          showFormMessage(
            "Return date cannot be before departure."
          );

          return;
        }


        const submitButton =
          charterForm.querySelector(
            ".form-submit"
          );


        const originalContent =
          submitButton
            ? submitButton.innerHTML
            : "";


        if (submitButton) {

          submitButton.disabled = true;

          submitButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Request...';

        }


        showFormMessage("");


        setTimeout(() => {

          showFormMessage(
            "Thank you. Your private flight request has been received. An AEROVANTA aviation advisor will contact you shortly.",
            true
          );


          charterForm.reset();


          if (departureInput) {
            departureInput.min =
              localToday;
          }


          if (returnInput) {
            returnInput.min =
              localToday;
          }


          if (submitButton) {

            submitButton.disabled = false;

            submitButton.innerHTML =
              originalContent;

          }

        }, 1200);

      }
    );

  }


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(
      [
        ".section-heading",
        ".about-content",
        ".about-images",
        ".fleet-card",
        ".service-card",
        ".destination-card",
        ".process-card",
        ".why-image",
        ".why-content",
        ".testimonial-card",
        ".charter-content",
        ".charter-form",
        ".contact-card"
      ].join(",")
    );


  revealElements.forEach(
    (element, index) => {

      element.style.opacity = "0";

      element.style.transform =
        "translateY(35px)";

      element.style.transition =
        `opacity 0.7s ease ${
          (index % 3) * 0.08
        }s, transform 0.7s ease ${
          (index % 3) * 0.08
        }s`;

    }
  );


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.opacity =
            "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );


  /* =========================
     HERO COUNTERS
  ========================= */

  const heroStats =
    document.querySelectorAll(
      ".hero-details strong"
    );


  const counterData = [
    {
      target: 24,
      suffix: "/7"
    },
    {
      target: 5000,
      suffix: "+"
    },
    {
      target: 180,
      suffix: "+"
    },
    {
      target: 15,
      suffix: "+"
    }
  ];


  const animateCounter = (
    element,
    target,
    suffix
  ) => {

    const duration = 1600;

    const startTime =
      performance.now();


    const update = (currentTime) => {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      const value =
        Math.floor(
          eased * target
        );


      element.textContent =
        value.toLocaleString() +
        suffix;


      if (progress < 1) {
        requestAnimationFrame(
          update
        );
      }

    };


    requestAnimationFrame(
      update
    );

  };


  if (heroStats.length) {

    let countersStarted =
      false;


    const heroCounterObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting &&
                !countersStarted
              ) {

                countersStarted =
                  true;


                heroStats.forEach(
                  (stat, index) => {

                    const data =
                      counterData[index];


                    if (!data) return;


                    setTimeout(
                      () => {

                        animateCounter(
                          stat,
                          data.target,
                          data.suffix
                        );

                      },
                      index * 120
                    );

                  }
                );

              }

            }
          );

        },
        {
          threshold: 0.4
        }
      );


    const heroDetails =
      document.querySelector(
        ".hero-details"
      );


    if (heroDetails) {

      heroCounterObserver.observe(
        heroDetails
      );

    }

  }


  /* =========================
     FLEET CARD EFFECT
  ========================= */

  const fleetCards =
    document.querySelectorAll(
      ".fleet-card"
    );


  fleetCards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (
          window.innerWidth <= 900
        ) {
          return;
        }


        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;


        const y =
          event.clientY -
          rect.top;


        const centerX =
          rect.width / 2;


        const centerY =
          rect.height / 2;


        const rotateX =
          ((y - centerY) /
            centerY) *
          -1.2;


        const rotateY =
          ((x - centerX) /
            centerX) *
          1.2;


        card.style.transform =
          `translateY(-8px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


  /* =========================
     DESTINATION HOVER
  ========================= */

  destinationCards.forEach(
    (card) => {

      const content =
        card.querySelector(
          ".destination-content"
        );


      card.addEventListener(
        "mouseenter",
        () => {

          if (!content) return;

          content.style.transform =
            "translateY(-7px)";

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          if (!content) return;

          content.style.transform = "";

        }
      );

    }
  );


  /* =========================
     SERVICE CARD EFFECT
  ========================= */

  const serviceCards =
    document.querySelectorAll(
      ".service-card"
    );


  serviceCards.forEach(
    (card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          card.style.setProperty(
            "--mouse-x",
            `${x}px`
          );


          card.style.setProperty(
            "--mouse-y",
            `${y}px`
          );

        }
      );

    }
  );


  /* =========================
     CONTACT ICON EFFECT
  ========================= */

  const contactCards =
    document.querySelectorAll(
      ".contact-card"
    );


  contactCards.forEach(
    (card) => {

      const icon =
        card.querySelector(
          ".contact-icon"
        );


      card.addEventListener(
        "mouseenter",
        () => {

          if (!icon) return;

          icon.style.transform =
            "rotate(45deg) scale(1.08)";

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          if (!icon) return;

          icon.style.transform =
            "rotate(45deg) scale(1)";

        }
      );

    }
  );


  /* =========================
     HERO PARALLAX
  ========================= */

  const hero =
    document.querySelector(
      ".hero"
    );


  const handleHeroParallax =
    () => {

      if (!hero) return;


      if (
        window.innerWidth <= 900
      ) {

        hero.style.backgroundPosition =
          "center center";

        return;
      }


      const scroll =
        window.scrollY;


      if (
        scroll <=
        hero.offsetHeight
      ) {

        hero.style.backgroundPosition =
          `center ${scroll * 0.18}px`;

      }

    };


  window.addEventListener(
    "scroll",
    handleHeroParallax
  );


  /* =========================
     LUXURY FEATURE EFFECT
  ========================= */

  const luxuryFeatures =
    document.querySelectorAll(
      ".luxury-features div"
    );


  luxuryFeatures.forEach(
    (feature) => {

      const icon =
        feature.querySelector("i");


      feature.addEventListener(
        "mouseenter",
        () => {

          if (!icon) return;

          icon.style.transform =
            "translateY(-5px) scale(1.08)";

          icon.style.transition =
            "0.3s ease";

        }
      );


      feature.addEventListener(
        "mouseleave",
        () => {

          if (!icon) return;

          icon.style.transform =
            "translateY(0) scale(1)";

        }
      );

    }
  );


  /* =========================
     PROCESS ICON EFFECT
  ========================= */

  const processCards =
    document.querySelectorAll(
      ".process-card"
    );


  processCards.forEach(
    (card) => {

      const icon =
        card.querySelector(
          ".process-icon"
        );


      card.addEventListener(
        "mouseenter",
        () => {

          if (!icon) return;

          icon.style.background =
            "#08111f";

          icon.style.color =
            "#e3c98f";

          icon.style.transform =
            "rotate(45deg) scale(1.08)";

          icon.style.transition =
            "0.35s ease";

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          if (!icon) return;

          icon.style.background = "";

          icon.style.color = "";

          icon.style.transform =
            "rotate(45deg) scale(1)";

        }
      );

    }
  );


  /* =========================
     TESTIMONIAL EFFECT
  ========================= */

  const testimonialCards =
    document.querySelectorAll(
      ".testimonial-card"
    );


  testimonialCards.forEach(
    (card) => {

      card.addEventListener(
        "mouseenter",
        () => {

          const avatar =
            card.querySelector(
              ".client-avatar"
            );


          if (avatar) {

            avatar.style.transform =
              "scale(1.08)";

            avatar.style.transition =
              "0.3s ease";

          }

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          const avatar =
            card.querySelector(
              ".client-avatar"
            );


          if (avatar) {

            avatar.style.transform =
              "scale(1)";

          }

        }
      );

    }
  );

});