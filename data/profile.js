/* Everything about me that is not a project: edit here, the page renders it. */
window.PROFILE = {
  name: 'Ludovico Grabau',
  role: 'Medical AI Researcher · ML Engineer · Computer Scientist',
  location: 'Geneva, Switzerland',
  codingSince: 2016,  // year I started programming (the photo badge counts from it)
  photo: 'assets/img/ludovico-grabau.webp',
  pitch:
    'MSc in Artificial Intelligence in Medicine (University of Bern) and BSc in Computer Science (HEPIA Geneva). ' +
    'I build machine-learning systems that have to work outside the notebook: my master thesis decodes walking ' +
    'intentions from a dry-electrode EEG headset in real time to steer a gait-rehabilitation robot.',
  about: [
    'I am a computer scientist who moved into medical AI. At HEPIA I learned to build software from the metal up: ' +
      'C and assembly on microcontrollers, a compiler, distributed systems, cloud deployments, mobile and web apps. ' +
      'My bachelor thesis put GPT-driven characters in a 3D Unity world.',
    'At the University of Bern I specialised in machine learning for healthcare: computer vision, deep learning, ' +
      'NLP for clinical text, reinforcement learning, signal processing, neurotechnology and omics. My master thesis, ' +
      'run at the BFH neuro-rehaLab, benchmarks nine EEG decoders, from a classical spatial-filtering pipeline to EEG foundation ' +
      'models, and ships the best one in a real-time brain-computer interface that turns EEG into robot commands.',
    'I care about rigorous evaluation (honest cross-validation, calibrated confidence, real-time constraints) and ' +
      'about making systems that other people can set up, run and trust.'
  ],
  languages: [
    { name: 'French', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Italian', level: 'Fluent' },
    { name: 'German', level: 'Intermediate (A2–B1)' },
    { name: 'Spanish', level: 'Beginner (A1)' }
  ],
  links: {
    email: 'ludovico.grabau@protonmail.com',
    linkedin: 'https://www.linkedin.com/in/ludovico-grabau',
    github: 'https://github.com/ludovico-grabau'
  },
  // Set to a PDF path (e.g. 'assets/cv/CV_Ludovico_Grabau.pdf') to show a "Download CV" button.
  cv: null,

  experience: [
    {
      title: 'Master thesis researcher',
      org: 'BFH neuro-rehaLab & UniBE ARTORG Center',
      place: 'Biel / Bern',
      period: 'Mar 2026 – Sep 2026',
      points: [
        'Benchmarked 9 EEG decoders (FBCSP, EEGNet, TimesNet, S-Mamba, iTransformer, Neuro-GPT, CBraMod, LaBraM, Chronos) under three generalisation protocols with Optuna HPO.',
        'Built the real-time pipeline: DSI-24 streaming, filtering, windowing, decoding with a confidence gate, and control of a mecanum-wheel gait-trainer surrogate.',
        'Best decoder: 85.5% balanced accuracy on 5 classes (chance 20%), 94.1% on confidence-gated windows.'
      ],
      project: 'msc-thesis'
    },
    {
      title: 'Neuroengineer intern & research assistant',
      org: 'neuro-rehaLab, Bern University of Applied Sciences (BFH)',
      place: 'Biel/Bienne',
      period: 'Jul 2025 – Aug 2025',
      points: [
        'Architected a low-latency Python API interfacing directly with the DSI-24 headset for real-time EEG processing and streaming.',
        'Built noise-filtering pipelines and live visualisers for continuous tracking of brain microstates.',
        'Set up a fully documented, reproducible GitHub environment to speed up onboarding on future neurotech projects.',
        'Continued with the lab for my master thesis.'
      ],
      project: 'rehalab-eeg-pipeline'
    },
    {
      title: 'Research scientist',
      org: 'El-Boustani Lab, Laboratory for Cognitive Neurobiology, Centre Médical Universitaire',
      place: 'Geneva',
      period: 'Feb 2024 – Aug 2024',
      points: [
        'Implemented from scratch, in Python, the mathematical model of mouse motivation and effort from a previous student’s research thesis (every formula and step), and assembled it into reinforcement-learning simulations of a sensorimotor task for the MOUSEMIND project.',
        'Ran a reverse hyper-parameter search over the reinforcement-learning-based simulations to find the conditioning parameters that produce the best behaviour in the task, giving the optimal configuration to apply to live mice in the wet lab.'
      ],
      project: 'mousemind'
    },
    {
      title: 'Python & Scratch programming teacher',
      org: 'TechSpark Academy',
      place: 'Geneva',
      period: 'Jul 2018 – Aug 2022',
      points: [
        'Turned programming concepts into engaging lessons for children and teens in the Code in Python and Animation & Game Design courses.',
        'Progressed from student to assistant instructor to lead instructor over four seasons of summer programmes.',
        'Mentored students through hands-on projects in intensive summer bootcamps at Institut Florimont.'
      ]
    },
    {
      title: 'R&D intern',
      org: 'COSMICS S.A.',
      place: 'Geneva',
      period: 'Jun 2019 – Sep 2020',
      points: [
        'Engineered and evaluated machine-learning models for specific stock and forex markets as a core member of the R&D team.',
        'Designed scalable software architectures for deploying and running AI-driven trading applications.',
        'Resolved network bottlenecks in the trading infrastructure to keep market data flowing reliably.',
        'Worked with the core software team to integrate R&D work into daily development.'
      ],
      project: 'stock-prediction'
    },
    {
      title: 'Web design intern',
      org: 'Cyber Resilience Suisse',
      place: 'Gland',
      period: 'Aug 2018 (one month)',
      points: [
        'Proposed a redesign of the company website: structure, graphic charter and a new logo.',
        'Introduced to the Digital Oversight cyber-threat-intelligence platform and the Cyber Battlefield training simulator.'
      ]
    }
  ],

  education: [
    {
      degree: 'Master of Science in Artificial Intelligence in Medicine',
      school: 'University of Bern, Faculty of Medicine (ARTORG Center)',
      place: 'Bern',
      period: 'Sep 2024 – Sep 2026',
      thesis: 'Benchmarking Decoders for Directional Intent Control of a Mobile Gait Trainer Using a Dry-Electrode EEG-Based BCI',
      thesisProject: 'msc-thesis',
      courses: [
        { term: 'Autumn 2024', list: ['Machine Learning', 'Computer Vision', 'Introduction to AI', 'Applied Optimization', 'Introduction to Digital Signal Processing', 'Basics of Physiology', 'Introduction to Clinics', 'Linear Algebra, Probability & Optimization (bridging)'] },
        { term: 'Spring 2025', list: ['Deep Learning', '3D Geometry Processing', 'C++ Programming', 'Biomedical Signal Processing', 'Clinical Decision Support', 'Trustworthy AI in Medicine', 'Rehabilitation Technology', 'Microsystems Engineering'] },
        { term: 'Autumn 2025', list: ['Reinforcement Learning', 'From NLP to LLMs', 'Computer Graphics', 'Medical Image Analysis', 'Neurotechnology', 'Omics for Non-Biologists', 'Ophthalmic Technologies', 'Seminar in Machine Learning & AI'] },
        { term: 'Spring 2026', list: ['Master thesis'] }
      ]
    },
    {
      degree: 'Bachelor of Science HES-SO in Computer Science and Communication Systems (software engineering)',
      school: 'HEPIA, Geneva School of Landscape, Engineering and Architecture',
      place: 'Geneva',
      period: 'Sep 2020 – Sep 2023',
      thesis: 'AI & conversational agents in a narrative video-game experience (Unity + GPT)',
      thesisProject: 'bsc-thesis',
      courses: [
        { term: 'Year 1', list: ['Sequential Programming in C', 'Algorithms', 'Computer Architecture', 'Logic Systems', 'Microcontroller Programming', 'Embedded Systems Prototyping', 'Mathematics for IT', 'Applied Mathematics', 'Physics for Engineering', 'Network Fundamentals', 'Telecommunications Fundamentals', 'Information Security & Cryptography', 'History & Society of Computing'] },
        { term: 'Year 2', list: ['Object-Oriented Programming (Java)', 'Advanced Algorithms', 'Systems Programming', 'Operating Systems', 'Compiler Techniques', 'Databases', 'Web Applications & Architecture', 'Application Security', 'Network Security in Practice', 'Digital Image Processing', 'Computational Geometry', 'Processors (ARM assembly)', 'Concurrent Programming', 'Orientation Project'] },
        { term: 'Year 3', list: ['Software Engineering', 'Cloud & Deployment', 'Distributed Systems', 'Mobile Development', 'AI & Machine Learning', 'HPC & Big Data', 'Advanced Systems Programming (x86 kernel)', 'Virtualization', 'Functional Programming (Scala)', 'Communicating Objects (IoT)', 'Project Management', 'Semester Project', 'Bachelor Thesis'] },
        { term: 'Summer schools', list: ['IoT with Pycom boards (2021)', 'Mobile games with Flutter & Flame (2022)'] }
      ]
    }
  ],

  skills: [
    { group: 'Machine learning & AI', items: ['PyTorch', 'TensorFlow / Keras', 'scikit-learn', 'Optuna (HPO)', 'Transformers & foundation models', 'LoRA / fine-tuning', 'Reinforcement learning', 'spaCy & LLMs', 'NumPy · pandas'] },
    { group: 'Medical & signals', items: ['EEG / BCI', 'MNE-Python', 'Time-series decoding', 'Digital filters & spectra', 'Medical imaging', 'Wearables & actigraphy', 'Omics (R)', 'Explainable & trustworthy AI'] },
    { group: 'Vision & graphics', items: ['OpenCV', 'Epipolar geometry', 'Ray tracing', 'OpenGL & GLSL', 'Mesh processing (OpenMesh)', 'Photogrammetry'] },
    { group: 'Languages', items: ['Python', 'C / C++', 'C# (Unity)', 'Java', 'TypeScript / JavaScript', 'Kotlin', 'Dart (Flutter)', 'Scala', 'Julia', 'SQL', 'Bash', 'MATLAB / Octave', 'R', 'ARM assembly (Thumb-2)'] },
    { group: 'Systems, cloud & tooling', items: ['Linux', 'Git & GitLab CI', 'Docker', 'Kubernetes', 'Terraform', 'AWS · GCP · Azure', 'MPI & SLURM clusters', 'CUDA', 'MongoDB · SQLite · Prisma'] },
    { group: 'Domains', items: ['Medical AI', 'Rehabilitation', 'Data privacy', 'MLOps'] },
    { group: 'Ways of working', items: ['Problem solving', 'Teamwork', 'Critical thinking', 'Communication', 'Leadership', 'Agile methodology', 'Time management', 'Attention to detail', 'Graphic & 3D design', 'Event organisation', 'Teaching & mentoring'] }
  ]
};
