
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    const popup = document.getElementById('popup');
    const amounts = document.querySelectorAll('.amount:not(.payment)');
    const paymentOptions = document.querySelectorAll('.payment');
    const donationMessage = document.getElementById('donationMessage');
    const donateBtn = document.getElementById('donateBtn');
    const adoptionForm = document.getElementById('adoptionForm');
    const contactForm = document.getElementById('contactForm');
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    const meetCatsBtn = document.getElementById('meetCatsBtn');
    const catsSection = document.getElementById('cats');
    const selectedCat = document.getElementById('selectedCat');
    const adoptionModal = document.getElementById('adoptionModal');
    const closeAdoptionModal = document.getElementById('closeAdoptionModal');
    const modalAdoptBtn = document.getElementById('modalAdoptBtn');
    let currentCatName = '';

    const donorName = document.getElementById('donorName');
    const donorEmail = document.getElementById('donorEmail');
    const paymentDetails = document.getElementById('paymentDetails');
    const paymentTitle = document.getElementById('paymentTitle');
    const paymentInstruction = document.getElementById('paymentInstruction');
    const paymentAccount = document.getElementById('paymentAccount');
    const referenceNumber = document.getElementById('referenceNumber');

    const catModal = document.getElementById('catModal');
    const closeModal = document.getElementById('closeModal');
    const modalName = document.getElementById('modalName');
    const modalAge = document.getElementById('modalAge');
    const modalBreed = document.getElementById('modalBreed');
    const modalStory = document.getElementById('modalStory');
    const modalPersonality = document.getElementById('modalPersonality');
    const modalReason = document.getElementById('modalReason');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
      });
    }

    if (meetCatsBtn) {
      meetCatsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        catsSection.style.display = 'block';
        catsSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    document.querySelectorAll('.menu a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('show');
      });
    });

    function showPopup(message) {
      popup.textContent = message;
      popup.style.display = 'block';
      popup.style.opacity = '1';

      setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => {
          popup.style.display = 'none';
        }, 300);
      }, 3500);
    }

    document.querySelectorAll('.cat-card').forEach(card => {
      card.addEventListener('click', () => {
        modalName.textContent = card.dataset.name || 'Rescue Cat';
        modalAge.textContent = card.dataset.age || 'Not specified';
        modalBreed.textContent = card.dataset.breed || 'Rescue cat';
        modalStory.textContent = card.dataset.story || 'This cat is waiting for a loving home.';
        modalPersonality.textContent = card.dataset.personality || 'Sweet and gentle.';
        modalReason.textContent = card.dataset.reason || 'Every rescue cat deserves a second chance.';
        currentCatName = card.dataset.name || 'Rescue Cat';
        catModal.style.display = 'flex';
      });
    });

    if (closeModal) {
      closeModal.addEventListener('click', () => {
        catModal.style.display = 'none';
      });
    }

    if (catModal) {
      catModal.addEventListener('click', (e) => {
        if (e.target === catModal) {
          catModal.style.display = 'none';
        }
      });
    }

    function openAdoptionForm(catName) {
      currentCatName = catName;
      selectedCat.value = catName;
      adoptionIntro.textContent = `You are applying to adopt ${catName}. Your application will be reviewed for screening, and our rescue team will contact you with the next steps.`;
      catModal.style.display = 'none';
      adoptionModal.style.display = 'flex';
    }

    adoptButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const catName = button.parentElement.querySelector('h3').textContent;
        openAdoptionForm(catName);
      });
    });

    modalAdoptBtn.addEventListener('click', () => {
      openAdoptionForm(currentCatName || modalName.textContent || 'this cat');
    });

    closeAdoptionModal.addEventListener('click', () => {
      adoptionModal.style.display = 'none';
    });

    adoptionModal.addEventListener('click', (e) => {
      if (e.target === adoptionModal) {
        adoptionModal.style.display = 'none';
      }
    });

    amounts.forEach(amount => {
      amount.addEventListener('click', () => {
        amounts.forEach(item => item.classList.remove('active'));
        amount.classList.add('active');
        donationMessage.textContent = `You selected ${amount.textContent}. Please choose your payment method next.`;
      });
    });

    paymentOptions.forEach(payment => {
      payment.addEventListener('click', () => {
        paymentOptions.forEach(item => item.classList.remove('active'));
        payment.classList.add('active');
        paymentDetails.style.display = 'block';
        paymentTitle.textContent = `${payment.textContent} Donation Details`;

        if (payment.textContent === 'GCash') {
          paymentInstruction.textContent = 'Scan the sample QR code or send your donation to the demo GCash number below.';
          paymentAccount.innerHTML = '<b>GCash Number:</b> 09XX-XXX-XXXX';
        } else if (payment.textContent === 'Maya') {
          paymentInstruction.textContent = 'Scan the sample QR code or send your donation to the demo Maya number below.';
          paymentAccount.innerHTML = '<b>Maya Number:</b> 09XX-XXX-XXXX';
        } else {
          paymentInstruction.textContent = 'Use your preferred bank app, then enter the sample reference number below.';
          paymentAccount.innerHTML = '<b>Bank:</b> BDO / BPI / UnionBank<br><b>Account Number:</b> XXXX-XXXX-XXXX';
        }

        const selectedAmount = document.querySelector('.amount:not(.payment).active');
        if (selectedAmount) {
          donationMessage.textContent = `You selected ${selectedAmount.textContent} through ${payment.textContent}. Please enter your reference number.`;
        } else {
          donationMessage.textContent = `You selected ${payment.textContent}. Please choose a donation amount too.`;
        }
      });
    });

    donateBtn.addEventListener('click', () => {
      const selected = document.querySelector('.amount:not(.payment).active');
      const payment = document.querySelector('.payment.active');

      if (!donorName.value.trim()) {
        showPopup('Please enter your full name.');
      } else if (!donorEmail.value.trim() || !donorEmail.value.includes('@gmail.com')) {
        showPopup('Please enter a valid Gmail address that contains @gmail.com.');
      } else if (!selected) {
        showPopup('Please choose a donation amount first.');
      } else if (!payment) {
        showPopup('Please choose GCash, Maya, or Bank Transfer.');
      } else if (!referenceNumber.value || isNaN(referenceNumber.value)) {        showPopup('Please enter your transaction/reference number after payment.');
      } else {
        showPopup(`Thank you, ${donorName.value}! Your ${selected.textContent} donation through ${payment.textContent} has been recorded for verification.`);
      }
    });

    adoptionForm.addEventListener('submit', event => {
      event.preventDefault();

      if (!selectedCat.value.trim()) {
        showPopup('Please click Adopt on one of the cats first.');
        return;
      }

      showPopup(`Your adoption application for ${selectedCat.value} has been received. It will now move to screening, and our rescue team will contact you soon.`);
      adoptionModal.style.display = 'none';
      adoptionForm.reset();
    });

    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      showPopup('Thank you for contacting us. Our rescue team will reply to your message soon.');
      contactForm.reset();
    });