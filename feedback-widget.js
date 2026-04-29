class FeedbackWidget {
  constructor(form) {
    this.form = form;
    this.storageKey = 'evostream-feedback-draft';
    this.successMsg = document.getElementById('successMsg');
    this.statusNode = document.getElementById('feedbackStatus');
    this.ratingInput = document.getElementById('feedbackRating');
    this.topicInput = document.getElementById('feedbackTopic');
    this.starButtons = Array.from(document.querySelectorAll('.star-btn'));
    this.topicButtons = Array.from(document.querySelectorAll('.pill-btn'));
  }

  init() {
    if (!this.form) return;

    this.restoreDraft();
    this.bindStars();
    this.bindTopics();
    this.bindDraftSaving();
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  bindStars() {
    this.starButtons.forEach((button) => {
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        this.ratingInput.value = button.dataset.val;
        this.syncStars();
        this.saveDraft();
        this.setStatus('');
      });
    });

    this.syncStars();
  }

  bindTopics() {
    this.topicButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.topicInput.value = button.textContent.trim();
        this.syncTopics();
        this.saveDraft();
      });
    });

    this.syncTopics();
  }

  bindDraftSaving() {
    this.form.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach((field) => {
      field.addEventListener('input', () => this.saveDraft());
    });
  }

  syncStars() {
    const rating = Number(this.ratingInput.value || 0);
    this.starButtons.forEach((button) => {
      const active = Number(button.dataset.val) <= rating;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  syncTopics() {
    const selectedTopic = this.topicInput.value;
    this.topicButtons.forEach((button) => {
      button.classList.toggle('selected', button.textContent.trim() === selectedTopic);
    });
  }

  saveDraft() {
    const payload = {
      rating: this.ratingInput.value,
      topic: this.topicInput.value,
      name: this.form.name.value,
      email: this.form.email.value,
      comments: this.form.comments.value
    };

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch (error) {
      this.setStatus('Draft saving is unavailable in this browser.');
    }
  }

  restoreDraft() {
    try {
      const rawDraft = localStorage.getItem(this.storageKey);
      if (!rawDraft) return;

      const draft = JSON.parse(rawDraft);
      this.ratingInput.value = draft.rating || '';
      this.topicInput.value = draft.topic || '';
      this.form.name.value = draft.name || '';
      this.form.email.value = draft.email || '';
      this.form.comments.value = draft.comments || '';
    } catch (error) {
      this.setStatus('Saved draft data could not be restored.');
    }
  }

  clearDraft() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      this.setStatus('Draft cleanup is unavailable in this browser.');
    }
  }

  setStatus(message) {
    if (this.statusNode) {
      this.statusNode.textContent = message;
    }
  }

  buildMailtoUrl() {
    const topic = this.topicInput.value || 'Not selected';
    const rating = this.ratingInput.value || 'Not rated';
    const lines = [
      `Name: ${this.form.name.value}`,
      `Email: ${this.form.email.value}`,
      `Rating: ${rating}/5`,
      `Topic: ${topic}`,
      '',
      'Comments:',
      this.form.comments.value
    ];

    const subject = `EvoStream Feedback from ${this.form.name.value}`;
    const body = lines.join('\n');

    return `mailto:hassanawan789@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.form.reportValidity()) {
      return;
    }

    if (!this.ratingInput.value) {
      this.setStatus('Please choose a rating before sending your feedback.');
      return;
    }

    this.saveDraft();
    window.location.href = this.buildMailtoUrl();

    this.form.style.display = 'none';
    if (this.successMsg) {
      this.successMsg.style.display = 'block';
    }
    this.clearDraft();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.getElementById('feedbackForm');
  const widget = new FeedbackWidget(feedbackForm);
  widget.init();
});
