/* =========================================
   WILDCRAFT TOURS
   BOOKING SYSTEM
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       ELEMENTS
    ========================================= */

    const bookingForm =
        document.getElementById("bookingForm");

    const steps =
        document.querySelectorAll(".booking-step");

    const progressSteps =
        document.querySelectorAll(".progress-step");

    const nextButtons =
        document.querySelectorAll(".booking-next");

    const backButtons =
        document.querySelectorAll(".booking-back");


    /* =========================================
       CURRENT STEP
    ========================================= */

    let currentStep = 1;


    /* =========================================
       SHOW STEP
    ========================================= */

    function showStep(stepNumber) {

        currentStep = stepNumber;


        steps.forEach(step => {

            const stepValue =
                Number(step.dataset.step);

            step.classList.toggle(
                "active",
                stepValue === stepNumber
            );

        });


        progressSteps.forEach((step, index) => {

            const stepNumber =
                index + 1;

            step.classList.toggle(
                "active",
                stepNumber <= currentStep
            );

        });


        window.scrollTo({
            top: document.querySelector(".booking-section").offsetTop - 100,
            behavior: "smooth"
        });

    }


    /* =========================================
       VALIDATE CURRENT STEP
    ========================================= */

    function validateStep(stepNumber) {

        const step =
            document.querySelector(
                `.booking-step[data-step="${stepNumber}"]`
            );

        if (!step) {
            return true;
        }


        const requiredFields =
            step.querySelectorAll("[required]");


        for (const field of requiredFields) {

            if (!field.checkValidity()) {

                field.reportValidity();

                return false;

            }

        }


        return true;

    }


    /* =========================================
       NEXT BUTTONS
    ========================================= */

    nextButtons.forEach(button => {

        button.addEventListener("click", () => {

            const nextStep =
                Number(button.dataset.next);


            if (!validateStep(currentStep)) {
                return;
            }


            showStep(nextStep);

            updateSummary();

        });

    });


    /* =========================================
       BACK BUTTONS
    ========================================= */

    backButtons.forEach(button => {

        button.addEventListener("click", () => {

            const previousStep =
                Number(button.dataset.back);

            showStep(previousStep);

        });

    });


    /* =========================================
       NUMBER CONTROLS
    ========================================= */

    const plusButtons =
        document.querySelectorAll(".number-plus");

    const minusButtons =
        document.querySelectorAll(".number-minus");


    plusButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target =
                document.getElementById(
                    button.dataset.target
                );

            if (!target) return;


            const max =
                Number(target.max) || 50;

            const current =
                Number(target.value) || 0;


            if (current < max) {

                target.value =
                    current + 1;

            }


            updateSummary();

        });

    });


    minusButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target =
                document.getElementById(
                    button.dataset.target
                );

            if (!target) return;


            const min =
                Number(target.min) || 0;

            const current =
                Number(target.value) || 0;


            if (current > min) {

                target.value =
                    current - 1;

            }


            updateSummary();

        });

    });


    /* =========================================
       SUMMARY
    ========================================== */

    function updateSummary() {

        const tour =
            document.getElementById("tour");

        const travelDate =
            document.getElementById("travelDate");

        const duration =
            document.getElementById("duration");

        const adults =
            document.getElementById("adults");

        const children =
            document.getElementById("children");

        const accommodation =
            document.getElementById("accommodation");


        const summaryTour =
            document.getElementById("summaryTour");

        const summaryDate =
            document.getElementById("summaryDate");

        const summaryDuration =
            document.getElementById("summaryDuration");

        const summaryTravelers =
            document.getElementById("summaryTravelers");

        const summaryAccommodation =
            document.getElementById("summaryAccommodation");

        const summaryTransport =
            document.getElementById("summaryTransport");


        /* TOUR */

        if (tour && tour.value) {

            summaryTour.textContent =
                tour.value;

        } else {

            summaryTour.textContent =
                "Not selected";

        }


        /* DATE */

        if (travelDate && travelDate.value) {

            const date =
                new Date(
                    travelDate.value + "T00:00:00"
                );

            summaryDate.textContent =
                date.toLocaleDateString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );

        } else {

            summaryDate.textContent =
                "Not selected";

        }


        /* DURATION */

        if (duration && duration.value) {

            summaryDuration.textContent =
                duration.value;

        } else {

            summaryDuration.textContent =
                "Not selected";

        }


        /* TRAVELERS */

        const adultCount =
            adults ? Number(adults.value) : 1;

        const childCount =
            children ? Number(children.value) : 0;


        let travelerText =
            `${adultCount} Adult`;

        if (adultCount !== 1) {
            travelerText += "s";
        }


        if (childCount > 0) {

            travelerText +=
                ` · ${childCount} Child`;

            if (childCount !== 1) {
                travelerText += "ren";
            }

        }


        summaryTravelers.textContent =
            travelerText;


        /* ACCOMMODATION */

        if (accommodation && accommodation.value) {

            summaryAccommodation.textContent =
                accommodation.value;

        } else {

            summaryAccommodation.textContent =
                "Not selected";

        }


        /* TRANSPORT */

        const selectedTransport =
            document.querySelector(
                'input[name="transport"]:checked'
            );


        if (selectedTransport) {

            summaryTransport.textContent =
                selectedTransport.value;

        }

    }


    /* =========================================
       LISTEN FOR FORM CHANGES
    ========================================== */

    bookingForm.addEventListener(
        "change",
        updateSummary
    );


    bookingForm.addEventListener(
        "input",
        updateSummary
    );


    /* =========================================
       PREVENT PAST DATES
    ========================================== */

    const travelDate =
        document.getElementById("travelDate");


    if (travelDate) {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(today.getDate())
                .padStart(2, "0");


        travelDate.min =
            `${year}-${month}-${day}`;

    }


    /* =========================================
       FORM SUBMISSION
    ========================================== */

    bookingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (!validateStep(3)) {
                return;
            }


            const formData =
                new FormData(bookingForm);


            const bookingData = {

                tourType:
                    formData.get("tourType"),

                tour:
                    formData.get("tour"),

                travelDate:
                    formData.get("travelDate"),

                duration:
                    formData.get("duration"),

                adults:
                    formData.get("adults"),

                children:
                    formData.get("children"),

                accommodation:
                    formData.get("accommodation"),

                transport:
                    formData.get("transport"),

                firstName:
                    formData.get("firstName"),

                lastName:
                    formData.get("lastName"),

                email:
                    formData.get("email"),

                phone:
                    formData.get("phone"),

                country:
                    formData.get("country"),

                requests:
                    formData.get("requests")

            };


            /*
                TEMPORARY STORAGE

                This saves the booking locally
                until we connect a real database.
            */

            localStorage.setItem(
                "wildcraftBooking",
                JSON.stringify(bookingData)
            );


            /* SHOW SUCCESS MODAL */

            const modal =
                document.getElementById(
                    "successModal"
                );

            modal.classList.add("active");


            console.log(
                "Booking request:",
                bookingData
            );

        }
    );


    /* =========================================
       MODAL
    ========================================== */

    const modal =
        document.getElementById("successModal");

    const modalClose =
        document.getElementById("modalClose");


    modalClose.addEventListener(
        "click",
        () => {

            modal.classList.remove("active");

        }
    );


    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {

                modal.classList.remove("active");

            }

        }
    );


    /* =========================================
       INITIALIZE
    ========================================== */

    showStep(1);

    updateSummary();

});