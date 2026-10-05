/*
 * The portfolio catalogue. One object per project; media (images, video,
 * code excerpts, PDFs) are attached by id from data/media.js, which
 * tools/build_media.py generates from tools/media_manifest.py.
 *
 * level:   'msc' | 'bsc' | 'personal'
 * kind:    'Thesis' | 'Project' | 'Coursework' | 'Lab series' | 'Internship' | 'Personal'
 * date:    'YYYY-MM' of completion, used for sorting
 * domains: values from window.DOMAINS below (used by the filters)
 */
window.DOMAINS = [
  'Medical AI',
  'Machine Learning',
  'Vision & Graphics',
  'Signal Processing',
  'Software & Web',
  'Mobile & Games',
  'Systems & Embedded',
  'Cloud & Distributed',
  'Security',
  'Algorithms & Math',
  'Communication'
];

window.PROJECTS = [
  /* ================================================================ MSc */
  {
    id: 'msc-thesis',
    metrics: ['85.5 % balanced accuracy, 5 classes', '94.1 % with confidence gate', '9 decoders benchmarked', 'Real-time closed loop'],
    level: 'msc', kind: 'Thesis',
    title: 'Steering a gait-rehabilitation robot with dry-electrode EEG',
    summary: 'Master thesis: benchmarking nine decoders that turn brain signals into walking directions, and running the best one in a real-time closed loop.',
    institution: 'University of Bern · BFH neuro-rehaLab', course: 'Master thesis (MSc AI in Medicine)',
    period: 'Mar – Sep 2026', date: '2026-09',
    team: 'Solo · supervised by Prof. S. Mougiakakou, Prof. J. Fang, Dr. L. Brigato',
    domains: ['Medical AI', 'Machine Learning', 'Signal Processing'],
    tech: ['Python', 'PyTorch', 'Optuna', 'MNE-Python', 'LoRA', 'DSI-24 EEG', 'scikit-learn', 'Windows/WSL2 deployment'],
    description: [
      'After a stroke or spinal-cord injury, walking is relearned through repetition, and rehabilitation works best when the patient actively drives the movement. This thesis builds a non-invasive brain–computer interface: a dry-electrode EEG headset (Wearable Sensing DSI-24) reads the user’s intention (idle, forward, backward, left or right) and a mobile, gravity-supported gait trainer moves accordingly.',
      'I compared nine time-series decoders under matched tuning budgets (120-trial Optuna search, multi-seed training): a classical FBCSP + LDA pipeline, four networks trained from scratch (EEGNet, TimesNet, iTransformer, S-Mamba), three pretrained EEG foundation models (Neuro-GPT, CBraMod, LaBraM, each in its own native preprocessing, frozen, LoRA and fully fine-tuned) and Chronos as a non-physiological control. Each was evaluated under three protocols: a within-subject ceiling, leave-recordings-out cross-validation (the deployment axis) and cross-person transfer.',
      'TimesNet reached 85.5 % ± 2.1 % balanced accuracy on five classes (chance 20 %), within 2.7 points of five other decoders. After multiple-comparison correction no pairwise difference was significant. A confidence gate lifts accuracy on retained windows to 94.1 %. EEG pretraining matched but did not beat the best from-scratch models, cross-person transfer stayed near chance (per-patient calibration remains necessary), and the compact EEGNet was the most data-efficient. Every model runs more than ten times faster than the 0.5 s decision cadence, and the full loop was demonstrated on the mini-juAndago robotic surrogate.'
    ],
    highlights: [
      '85.5 % balanced accuracy (5 classes) on honest leave-recordings-out CV; 94.1 % with the confidence gate',
      'Real-time pipeline: streaming → band-pass/notch filtering → 2 s windows at 0.5 s stride → decoder → gate → robot command',
      'Live “Neuro-Drive” dashboard with raw EEG, topography and decoded intent',
      'Reproducible: provenance-stamped results, setup guides for Windows and WSL2, documented hand-over to the lab'
    ],
    // The repository is private for now; uncomment once it is public:
    // links: [{ label: 'Code on GitHub', href: 'https://github.com/Way2Cold/EEGxAi2GaitRehab' }]
  },
  {
    id: 'rehalab-eeg-pipeline',
    level: 'msc', kind: 'Internship',
    title: 'EEG acquisition and preprocessing pipeline',
    summary: 'Summer internship at the neuro-rehaLab: streaming a dry-electrode headset and porting the lab’s MATLAB/EEGLAB processing to Python.',
    institution: 'BFH neuro-rehaLab', course: 'Neuroengineering internship',
    period: 'Jul – Aug 2025', date: '2025-08',
    team: 'Solo',
    domains: ['Medical AI', 'Signal Processing'],
    tech: ['Python', 'MNE-Python', 'NumPy/SciPy', 'DSI API (C)', 'YAML', 'Matplotlib'],
    description: [
      'Groundwork for the master thesis. I built a low-latency Python interface to the DSI-24 headset (on top of the vendor’s C API) for real-time streaming, and rebuilt the lab’s EEGLAB workflow with MNE: loading EDF recordings, a configurable filter bank (FIR windowed-sinc, IIR, Kaiser band-stop, notch, Wiener, Kalman and LMS filters described in YAML), power-spectral analysis and EEG microstates.'
    ],
    highlights: [
      'Table-driven port of each EEGLAB step to its MNE equivalent',
      '11 filter presets (delta → gamma bands, 50 Hz mains removal) with frequency responses and before/after plots',
      'Live visualisers for spectra and EEG microstates',
      'Documented, reproducible GitHub setup for the next people in the lab',
      'Became the acquisition layer of the thesis system'
    ]
  },
  {
    id: 'unibe-cv-sudoku',
    level: 'msc', kind: 'Coursework',
    title: 'Solving a Sudoku from a photo',
    summary: 'A classical vision pipeline: find the grid in a phone picture, straighten it, read the digits and write the solution back.',
    institution: 'University of Bern', course: 'Computer Vision',
    period: 'Oct 2024', date: '2024-10', team: 'Solo',
    domains: ['Vision & Graphics', 'Algorithms & Math'],
    tech: ['Python', 'OpenCV', 'NumPy', 'Jupyter'],
    description: ['Grid detection (blur, edges, contours, corner fitting), perspective rectification, cell extraction, digit recognition by template correlation, then solving and drawing the missing digits onto the original image.']
  },
  {
    id: 'unibe-cv-inpainting',
    level: 'msc', kind: 'Coursework',
    title: 'Image inpainting by energy minimisation',
    summary: 'Filling in missing pixels by minimising a regularised energy, derived by hand and solved two ways.',
    institution: 'University of Bern', course: 'Computer Vision',
    period: 'Nov 2024', date: '2024-11', team: 'Solo',
    domains: ['Vision & Graphics', 'Algorithms & Math'],
    tech: ['Python', 'NumPy', 'SciPy', 'Jupyter'],
    description: ['A data term keeps known pixels, a smoothness term fills the holes. I derived the finite-difference gradient of the energy (hand-written report), implemented gradient descent and a linearised Gauss–Seidel solver, and studied how the regularisation weight trades noise against blur.']
  },
  {
    id: 'unibe-cv-epipolar',
    metrics: ['12,590 noisy matches', 'RANSAC + eight-point', '3D point cloud from 2 views'],
    level: 'msc', kind: 'Coursework',
    title: 'Epipolar geometry and 3D reconstruction: the red cow',
    summary: 'From two photos to a 3D point cloud: fundamental matrix, RANSAC, camera pose and triangulation. Re-run for this site.',
    institution: 'University of Bern', course: 'Computer Vision',
    period: 'Dec 2024', date: '2024-12', team: 'Solo',
    domains: ['Vision & Graphics', 'Algorithms & Math'],
    tech: ['Python', 'NumPy', 'SciPy (sparse least squares)', 'ipyvolume', 'Jupyter'],
    parts: [
      { title: 'Epipolar geometry', text: 'Normalised eight-point algorithm for the fundamental matrix on Merton College, epipoles and epipolar lines, and an interactive view where clicking a point in one image draws its epipolar line in the other.' },
      { title: '3D reconstruction', text: 'On a synthetic pair of views of a cow with 12,590 noisy correspondences: RANSAC with the Sampson distance (1,854 outliers rejected), essential matrix from the calibration, decomposition into rotation and translation (choosing the one solution with the points in front of both cameras), then least-squares triangulation of every point.' },
      { title: 'Re-run', text: 'The red point cloud on this page comes from running my code again today; the turntable is rendered with Matplotlib, the original view with ipyvolume.' }
    ]
  },
  {
    id: 'unibe-ml-regression',
    level: 'msc', kind: 'Coursework',
    title: 'Regression and logistic regression from scratch',
    summary: 'Least squares, locally weighted regression with a tuned bandwidth, logistic regression by gradient descent, and a face classifier.',
    institution: 'University of Bern', course: 'Machine Learning',
    period: 'Oct 2024', date: '2024-10', team: 'Solo',
    domains: ['Machine Learning'],
    tech: ['Python', 'NumPy', 'scikit-learn', 'Matplotlib'],
    description: ['A regressor class and regression lines with and without intercept, locally weighted linear regression with the bandwidth chosen on test error, then logistic regression (sigmoid, log-likelihood, gradient descent, decision rule) with feature engineering for a non-linear boundary, and logistic regression to tell faces from non-faces, whose learned weights look like a face.']
  },
  {
    id: 'unibe-ml-svm',
    level: 'msc', kind: 'Coursework',
    title: 'Support-vector machines: Pegasos, one-vs-all and kernels',
    summary: 'A linear SVM solver written from scratch, a one-vs-all classifier on Fashion-MNIST, and RBF vs linear kernels.',
    institution: 'University of Bern', course: 'Machine Learning',
    period: 'Nov 2024', date: '2024-11', team: 'Solo',
    domains: ['Machine Learning'],
    tech: ['Python', 'NumPy', 'scikit-learn', 'Matplotlib'],
    description: ['The SVM hinge loss and its gradient, a Pegasos mini-batch solver used for face detection, a one-vs-all multiclass SVM on Fashion-MNIST (each class’s learned weights look like the garment), and a comparison of RBF and linear kernels on data that is not linearly separable. The same homework included the IMDB sentiment competition, which has its own page.']
  },
  {
    id: 'unibe-ml-ensembles',
    level: 'msc', kind: 'Coursework',
    title: 'Ensembles and clustering: AdaBoost, XGBoost, k-means, EM',
    summary: 'Bagging and AdaBoost, gradient boosting with feature selection, a modified k-means, expectation maximisation and image compression.',
    institution: 'University of Bern', course: 'Machine Learning',
    period: 'Dec 2024', date: '2024-12', team: 'Solo',
    domains: ['Machine Learning'],
    tech: ['Python', 'NumPy', 'scikit-learn', 'XGBoost', 'Matplotlib'],
    description: ['Feature engineering and bagging ensembles on a student-stress data set, AdaBoost implemented and visualised, XGBoost with feature selection on Titanic, then the bonus tasks: grid search for k-means and Gaussian mixtures, a modified k-means, expectation maximisation, and k-means colour quantisation to compress an image.']
  },
  {
    id: 'unibe-intro-ai',
    level: 'msc', kind: 'Coursework',
    title: 'Pacman AI 1: graph search and heuristics',
    summary: 'UC Berkeley CS188 project 1: DFS, BFS, uniform-cost and A* search, re-run for this site (26/25 on the original autograder).',
    institution: 'University of Bern', course: 'Introduction to Artificial Intelligence',
    period: 'Oct 2024', date: '2024-10', team: 'Solo',
    domains: ['Machine Learning', 'Algorithms & Math'],
    tech: ['Python'],
    description: [
      'A generic graph search behind DFS, BFS, uniform-cost and A*, a corners problem, and admissible, consistent heuristics for eating all the food.',
      'For this site I re-ran the project against the original autograder (with small shims for Python 3.12): 26/25, including the extra-credit heuristic. The maze images are drawn from a fresh run of my code.'
    ]
  },
  {
    id: 'unibe-pacman-multiagent',
    level: 'msc', kind: 'Coursework',
    title: 'Pacman AI 2: minimax, alpha-beta and expectimax agents',
    summary: 'CS188 project 2: adversarial search against the ghosts. Re-run for this site: 87 of 87 autograder tests pass (25/25).',
    institution: 'University of Bern', course: 'Introduction to Artificial Intelligence',
    period: 'Nov 2024', date: '2024-11', team: 'Solo',
    domains: ['Machine Learning', 'Algorithms & Math'],
    tech: ['Python'],
    description: [
      'A reflex agent with a hand-crafted evaluation function (stay away from active ghosts, chase scared ones, head for the nearest food), then minimax over any number of ghosts, alpha-beta pruning, expectimax for randomly moving ghosts, and a better evaluation function for expectimax. A short report explains each agent.',
      'Re-run today with the original autograder: 25/25. Over ten fixed-seed games, the reflex agent wins 8 on mediumClassic and expectimax with my evaluation function wins 8 on smallClassic.'
    ]
  },
  {
    id: 'unibe-applied-optimization',
    level: 'msc', kind: 'Coursework',
    title: 'Applied optimisation in C++',
    summary: 'Eleven exercises from convex analysis to interior-point methods, implemented in C++ with Eigen and unit tests.',
    institution: 'University of Bern', course: 'Applied Optimization',
    period: 'Autumn 2024', date: '2024-12', team: 'Pair (with Zejun Yan)',
    domains: ['Algorithms & Math'],
    tech: ['C++', 'Eigen', 'CMake', 'Google Test'],
    parts: [
      { title: 'Convexity', text: 'Convex sets and functions, convexity checks, duality.' },
      { title: 'Unconstrained solvers', text: 'Gradient descent with backtracking line search, Newton’s method, L-BFGS and Gauss–Newton, applied to mass-spring networks.' },
      { title: 'Constrained solvers', text: 'Trust region, equality-constrained optimisation, active-set, augmented Lagrangian and interior-point methods.' }
    ]
  },
  {
    id: 'unibe-geo-scanning',
    level: 'msc', kind: 'Coursework',
    title: '3D scanning: from photos to a Poisson surface',
    summary: 'A real object photographed from ~30 viewpoints, turned into a point cloud and mesh by photogrammetry, then reconstructed with Poisson.',
    institution: 'University of Bern', course: '3D Geometry Processing',
    period: 'Mar – Apr 2025', date: '2025-04', team: 'Pair (with Saúl Sánchez González)',
    domains: ['Vision & Graphics', 'Algorithms & Math'],
    tech: ['Agisoft Metashape', 'C++', 'OpenFlipper', 'Eigen'],
    description: ['Exercise 2: I photographed a toy lightsaber from about thirty viewpoints and reconstructed it in Agisoft Metashape. Exercise 6: Poisson surface reconstruction implemented as an OpenFlipper plugin, run on our scan and on a face point cloud at increasing octree depths.']
  },
  {
    id: 'unibe-geometry-processing',
    level: 'msc', kind: 'Coursework',
    title: 'Mesh processing in OpenFlipper: curvature, smoothing, remeshing',
    summary: 'C++ plugins for curves, normals and curvature, Delaunay triangulation, Laplacian smoothing, remeshing and parameterisation.',
    institution: 'University of Bern', course: '3D Geometry Processing',
    period: 'Feb – May 2025', date: '2025-05', team: 'Pair (with Saúl Sánchez González)',
    domains: ['Vision & Graphics', 'Algorithms & Math'],
    tech: ['C++', 'OpenMesh', 'OpenFlipper', 'Eigen', 'Qt'],
    parts: [
      { title: 'Representations & curves', text: 'Iso-contouring of implicit functions, curve smoothing (with written theory exercises).' },
      { title: 'Differential geometry', text: 'Vertex normals, mean and Gaussian curvature.' },
      { title: 'Meshing', text: '2D Delaunay triangulation.' },
      { title: 'Smoothing & remeshing', text: 'Uniform and cotangent Laplacian smoothing, implicit smoothing, feature enhancement, isotropic remeshing.' },
      { title: 'Parameterisation', text: 'Mapping a disk-topology mesh to the plane.' }
    ]
  },
  {
    id: 'unibe-dl-pneumonia',
    level: 'msc', kind: 'Coursework',
    title: 'Pneumonia detection on chest X-rays',
    summary: 'From an MLP to regularised CNNs on ~5,800 chest X-rays, with an analysis of over-fitting.',
    institution: 'University of Bern', course: 'Deep Learning',
    period: 'Apr 2025', date: '2025-04', team: 'Solo',
    domains: ['Medical AI', 'Machine Learning', 'Vision & Graphics'],
    tech: ['Python', 'PyTorch', 'Google Colab'],
    description: ['Dataset and data-loader pipeline, then an MLP, a CNN, and CNNs with dropout and weight decay (about 76–78 % validation accuracy), comparing their learning curves to diagnose over-fitting.']
  },
  {
    id: 'unibe-dl-captioning',
    metrics: ['BLEU-4 0.086 → 0.269', '6 models compared', 'Attention maps'],
    level: 'msc', kind: 'Coursework',
    title: 'Image captioning: from an RNN to cross-attention on DINOv2',
    summary: 'Six caption generators on Flickr8k, each one changing a single thing; BLEU-4 tripled from the baseline to the last model.',
    institution: 'University of Bern', course: 'Deep Learning',
    period: 'May 2025', date: '2025-05', team: 'Solo',
    domains: ['Machine Learning', 'Vision & Graphics'],
    tech: ['Python', 'PyTorch', 'DINOv2', 'Transformers', 'Weights & Biases', 'YAML configs'],
    description: [
      'Starting from the baseline encoder–decoder, I swapped in a frozen DINOv2 encoder with an RNN, then an LSTM, an LSTM initialised from the image embedding, a Transformer decoder on the CLS token, and finally a Transformer decoder that cross-attends to DINOv2’s spatial patch tokens. Each model has its own YAML config and was trained on GPU with the runs tracked in Weights & Biases.',
      'The report compares the losses and BLEU-1 to BLEU-4 (BLEU-4 from 0.086 to 0.269), shows the captions each model writes for new photos, and visualises where the last model looks while writing each word: its cross-attention maps serve as an explainable-AI check that the words are grounded in the right regions of the image.'
    ]
  },
  {
    id: 'unibe-cg-raytracer',
    level: 'msc', kind: 'Coursework',
    title: 'A ray tracer in C++: from spheres to meshes',
    summary: 'Ray–object intersections, Phong lighting, shadows, recursive reflections and triangle meshes with acceleration.',
    institution: 'University of Bern', course: 'Computer Graphics',
    period: 'Sep – Oct 2025', date: '2025-10', team: 'Team of 3 (with Florian Lutz and Louis von Grünigen)',
    domains: ['Vision & Graphics'],
    tech: ['C++', 'CMake'],
    parts: [
      { title: 'Intersections', text: 'Planes and cylinders added to a sphere-only ray tracer (solving for the ray parameter, handling parallel rays and the closest positive hit).' },
      { title: 'Lighting', text: 'The Phong model with ambient, diffuse and specular terms, shadow rays and recursive mirror reflections.' },
      { title: 'Meshes', text: 'Angle-weighted vertex normals, ray–triangle intersection with Cramer’s rule, flat vs smooth shading, and bounding-box tests to skip meshes a ray cannot hit.' }
    ]
  },
  {
    id: 'unibe-cg-opengl',
    level: 'msc', kind: 'Coursework',
    title: 'Real-time OpenGL: a solar system and shadow maps',
    summary: 'An interactive solar system with textured, shaded planets, then omnidirectional shadows with cube maps.',
    institution: 'University of Bern', course: 'Computer Graphics',
    period: 'Oct – Nov 2025', date: '2025-11', team: 'Team of 3 (with Florian Lutz and Louis von Grünigen)',
    domains: ['Vision & Graphics'],
    tech: ['C++', 'OpenGL', 'GLSL'],
    parts: [
      { title: 'Transformations', text: 'Planets on their orbits (the Moon around the Earth), a free camera that rotates around any planet and a camera locked behind a spaceship.' },
      { title: 'Shading', text: 'Phong shading in GLSL, an Earth shader blending day, night, clouds and specular water, and a glowing Sun.' },
      { title: 'Shadows', text: 'Point-light shadow mapping: six view matrices for the cube-map faces aligned with eye space, a 90° projection, and biasing against shadow acne.' }
    ]
  },
  {
    id: 'unibe-nlp-llm',
    level: 'msc', kind: 'Project',
    title: 'Clinical NLP: from text mining to custom medical NER and LLMs',
    summary: 'Group project on clinical abstracts: exploration, supervised classification, named-entity recognition and BERT/GPT models.',
    institution: 'University of Bern', course: 'From NLP to LLMs',
    period: 'Autumn 2025', date: '2025-12', team: 'Group of 4 (Zejun Yan, Anna Boss, Saúl Sánchez)',
    domains: ['Medical AI', 'Machine Learning'],
    tech: ['Python', 'spaCy', 'scikit-learn', 'Hugging Face Transformers', 'Keras', 'LLM APIs'],
    parts: [
      { title: 'Data exploration', text: 'Class balance, vocabulary and TF-IDF analysis of clinical abstracts; clustering quality vs number of clusters.' },
      { title: 'Medical NER', text: 'Built a gold standard by hand and trained a custom spaCy NER for diagnoses, procedures, age and gender, which worked well on our data. The comparison with off-the-shelf spaCy and an LLM extractor was limited by how broadly the brief could be read (the teacher later agreed it was too open), so only the custom model was tested properly; the project was valued for its statistical analysis instead.' },
      { title: 'Pre-trained transformers', text: 'A TF-IDF + logistic-regression baseline against DistilBERT and PubMedBERT (frozen features, fine-tuning, continual pre-training) and GPT-2 (zero- and five-shot prompting, LoRA fine-tuning), compared by macro-F1. The classical baseline won: with few, imbalanced labels, larger and more sophisticated models did not pay off.' }
    ]
  },
  {
    id: 'unibe-nlp-text-mining',
    level: 'msc', kind: 'Coursework',
    title: 'Clinical text processing: ICD-10 regex, spaCy and naive Bayes',
    summary: 'Individual exercise: extracting ICD-10 codes with regular expressions, spaCy pipelines and a naive Bayes sentiment model.',
    institution: 'University of Bern', course: 'From NLP to LLMs',
    period: 'Oct 2025', date: '2025-10', team: 'Solo',
    domains: ['Medical AI', 'Machine Learning'],
    tech: ['Python', 'Regular expressions', 'spaCy', 'scikit-learn'],
    description: ['A report and notebooks: a regex for ICD-10 diagnosis codes with its edge cases (optional sub-codes, word boundaries, typos in case), tokenisation, lemmas and entities with spaCy, and a naive Bayes sentiment classifier.']
  },
  {
    id: 'unibe-neuro-imu',
    level: 'msc', kind: 'Coursework',
    title: 'Gait and posture from wearable sensors',
    summary: 'A full day of foot, hip and wrist accelerometer data turned into steps, postures, velocity and spectra.',
    institution: 'University of Bern', course: 'Neurotechnology',
    period: 'Oct 2025', date: '2025-10', team: 'Solo',
    domains: ['Medical AI', 'Signal Processing'],
    tech: ['Python', 'NumPy/SciPy', 'pandas', 'Matplotlib'],
    description: ['Magnitude thresholding for step detection, sit/stand/walk segmentation over 24 h, velocity by integration, and Butterworth-filtered spectra of each axis.']
  },
  {
    id: 'unibe-neuro-actigraphy',
    level: 'msc', kind: 'Coursework',
    title: 'Actigraphy in depression',
    summary: 'Comparing motor activity of patients with depression and healthy controls on an open actigraphy dataset.',
    institution: 'University of Bern', course: 'Neurotechnology',
    period: 'Oct 2025', date: '2025-10', team: 'Solo',
    domains: ['Medical AI', 'Signal Processing'],
    tech: ['Python', 'pandas', 'Matplotlib'],
    description: ['Per-participant activity summaries (mean, variability, day vs night) and group comparisons: patients moved less on average than controls (mean activity 163.7 vs 208.7), with bipolar I patients the least active.']
  },
  {
    id: 'unibe-omics-genomics',
    level: 'msc', kind: 'Coursework',
    title: 'Genomics: GWAS and a SNP-based prognosis classifier',
    summary: 'Manhattan plots of a genome-wide association study, annotation of the hit region, and a classifier on SNP features.',
    institution: 'University of Bern', course: 'Omics for Non-Biologists',
    period: 'Dec 2025', date: '2025-12', team: 'Solo',
    domains: ['Medical AI', 'Machine Learning'],
    tech: ['R', 'biomaRt', 'caret', 'randomForest'],
    description: ['Manhattan plots, annotation of the variants flanking the significant region with biomaRt, then a random-forest prognosis classifier on SNP features (caret, 10-fold cross-validation) with its confusion matrix and the most informative SNPs per outcome.']
  },
  {
    id: 'unibe-omics-rnaseq',
    level: 'msc', kind: 'Coursework',
    title: 'Transcriptomics: RNA-seq differential expression',
    summary: 'From read counts to the genes that change when MOV10 is over-expressed.',
    institution: 'University of Bern', course: 'Omics for Non-Biologists',
    period: 'Oct – Nov 2025', date: '2025-11', team: 'Solo',
    domains: ['Medical AI'],
    tech: ['R', 'DESeq2', 'EnhancedVolcano', 'pheatmap'],
    description: ['A reproducible R pipeline (raw data, metadata, results and logs in separate folders): normalisation, PCA of the samples, differential expression, a volcano plot and a heatmap of the top genes, with the up- and down-regulated lists exported.']
  },
  {
    id: 'unibe-omics-proteomics',
    level: 'msc', kind: 'Project',
    title: 'Proteomics: clustering cancer patients',
    summary: 'Group project: patients grouped by their protein profiles, and what distinguishes the groups clinically.',
    institution: 'University of Bern', course: 'Omics for Non-Biologists',
    period: 'Dec 2025', date: '2025-12', team: 'Group project',
    domains: ['Medical AI', 'Machine Learning'],
    tech: ['Python', 'scikit-learn', 'pandas'],
    description: ['Clustering of patients from protein abundances, selection of the proteins that discriminate the clusters, and a clinical reading of the clusters (for example tumour size).']
  },
  {
    id: 'unibe-omics-multiomics',
    level: 'msc', kind: 'Coursework',
    title: 'Multi-omics: choosing a drug for a patient',
    summary: 'Six omics layers of one patient checked against the criteria of three candidate therapies, in a reproducible R report.',
    institution: 'University of Bern', course: 'Omics for Non-Biologists',
    period: 'Sep 2025', date: '2025-09', team: 'Solo',
    domains: ['Medical AI'],
    tech: ['R', 'R Markdown', 'dplyr', 'ggplot2'],
    description: ['Genomics, transcriptomics, proteomics, metabolomics, chromatin accessibility and microbiome data for one patient are plotted side by side and matched against each therapy’s molecular conditions. A rule-based score (all conditions met first, then the share of conditions met, then a tie rule) ranks the therapies: two of them met all their conditions, and the one supported by more conditions, ImmunoPro (4 of 4), is recommended, with the clinical reasoning written up in the report.']
  },
  {
    id: 'unibe-rl-bandits',
    level: 'msc', kind: 'Coursework',
    title: 'Multi-armed bandits and a custom grid world',
    summary: 'My own Gym environments and a comparison of exploration strategies over 100 runs.',
    institution: 'University of Bern', course: 'Reinforcement Learning',
    period: 'Oct 2025', date: '2025-10', team: 'Solo',
    domains: ['Machine Learning'],
    tech: ['Python', 'OpenAI Gym', 'NumPy', 'Matplotlib'],
    description: ['Grid-world environments written from scratch (random, blind and oracle policies, recorded as videos), then the 10-armed testbed: ε-greedy, UCB and gradient bandits compared on average reward and optimal-action rate.']
  },
  {
    id: 'unibe-rl-gridworld',
    level: 'msc', kind: 'Coursework',
    title: 'Dynamic programming and Q-learning against an enemy',
    summary: 'Policy evaluation, policy and value iteration, Monte-Carlo, TD and Q-learning in grid worlds with a moving enemy.',
    institution: 'University of Bern', course: 'Reinforcement Learning',
    period: 'Nov 2025', date: '2025-11', team: 'Solo',
    domains: ['Machine Learning'],
    tech: ['Python', 'OpenAI Gym', 'NumPy', 'Matplotlib'],
    description: ['Prediction and control on grid worlds, then Q-learning against a blind and an oracle enemy, with a sweep over learning rate, discount and exploration, and videos of the best agents.']
  },
  {
    id: 'unibe-rl-mountaincar',
    metrics: ['PPO: 100 % success (last 100 episodes)', 'DQN with replay & target nets', 'Potential-based reward shaping'],
    level: 'msc', kind: 'Coursework',
    title: 'Mountain Car with linear Q-learning, DQN and PPO',
    summary: 'Function approximation from linear Q-learning to an improved DQN, then PPO with reward shaping for the continuous version.',
    institution: 'University of Bern', course: 'Reinforcement Learning',
    period: 'Dec 2025 – Jan 2026', date: '2026-01', team: 'Solo',
    domains: ['Machine Learning'],
    tech: ['Python', 'PyTorch', 'OpenAI Gym', 'CUDA'],
    parts: [
      { title: 'Linear Q-learning', text: 'A linear Q-function trained on MountainCar-v0 over 10,000 episodes.' },
      { title: 'DQN', text: 'Replay buffer, target network with soft updates and an ε schedule, then an improved agent with my own network and decaying exploration (evaluation: −109 ± 3 return).' },
      { title: 'PPO', text: 'Actor–critic with PPO on MountainCarContinuous-v0 and a potential-based reward (position and kinetic energy) so the agent learns to swing: 100 % success over the last 100 training episodes, and 5 out of 5 evaluation episodes on the original environment reach the flag in 65–67 steps.' }
    ]
  },
  {
    id: 'unibe-imdb-sentiment',
    level: 'msc', kind: 'Coursework',
    metrics: ['2nd place on the class leaderboard', '92.5 % cross-validated accuracy', '428 configurations logged'],
    title: 'IMDB sentiment: 2nd place in a class Kaggle competition',
    summary: 'Hundreds of logged configurations to classify movie reviews: 2nd place on the class leaderboard, 92.5 % cross-validated accuracy.',
    institution: 'University of Bern', course: 'Machine Learning',
    period: 'Nov 2024', date: '2024-11', team: 'Solo',
    domains: ['Machine Learning'],
    tech: ['Python', 'scikit-learn', 'pandas', 'TF-IDF'],
    description: [
      'Part of the second machine-learning assignment: predict whether an IMDB review is positive or negative, with submissions scored on a class leaderboard. I scripted grid searches over vectorisers (counts, TF-IDF, hashing; n-grams, document-frequency cut-offs, tokenisation) and models (naive Bayes, logistic regression, linear SVM, SGD, trees) and logged every result: 428 configurations.',
      'Linear models on TF-IDF n-grams won (92.5 % with 10-fold cross-validation); tree models lagged far behind. My submission finished second on the class leaderboard. The chart on this page is drawn from my experiment log.'
    ]
  },
  {
    id: 'mousemind',
    level: 'personal', kind: 'Research',
    title: 'MOUSEMIND: computational modelling of decision-making', coverText: 'MOUSEMIND',
    summary: 'Research job in a neuroscience lab: I turned a thesis’s model of mouse behaviour into reinforcement-learning simulations, then ran a reverse hyper-parameter search for the wet-lab conditioning. Private project.',
    institution: 'El-Boustani Lab · Centre Médical Universitaire, Geneva', course: 'Research scientist',
    period: 'Feb – Aug 2024', date: '2024-08', team: 'Lab project (the simulation code is mine)',
    domains: ['Machine Learning', 'Algorithms & Math'],
    tech: ['Python', 'NumPy', 'Computational modelling', 'Reinforcement learning', 'Simulation', 'Hyper-parameter optimisation'],
    description: [
      'At the Laboratory for Cognitive Neurobiology I worked on MOUSEMIND, the lab’s computational model of how motivation and effort shape mouse behaviour in a sensorimotor task.',
      'I wrote the code from scratch. Starting from the mathematical model in a previous student’s research thesis, I implemented her whole pipeline, every formula and step, and made the pieces work together as reinforcement-learning simulations of a mouse learning the task.',
      'I then directed them at the lab’s main goal with a reverse hyper-parameter search: instead of fitting the model to recorded behaviour, the search ran the simulations over the parameters of the conditioning to find the set that produces the best behaviour in the sensorimotor task, so that this configuration could be applied to live mice in the wet lab.',
      'The project is unpublished and private, so no code, data or results are shown.'
    ]
  },

  /* ================================================================ BSc */
  {
    id: 'bsc-thesis',
    metrics: ['Free-text dialogue with NPCs', 'Memory, emotions & reputation', 'NPC-to-NPC conversations', 'Unity · C# · GPT-3.5'],
    level: 'bsc', kind: 'Thesis',
    title: 'GPT-driven characters in a narrative 3D game',
    summary: 'Bachelor thesis: a Unity prototype set in ancient Rome where non-player characters talk, remember, react emotionally and converse with each other through ChatGPT.',
    institution: 'HEPIA · in collaboration with Crafts Lab', course: 'Bachelor thesis (BSc Computer Science)',
    period: 'May – Jul 2023', date: '2023-07',
    team: 'Solo · supervised by Jeremy Gobet',
    domains: ['Mobile & Games', 'Machine Learning'],
    tech: ['Unity', 'C#', 'OpenAI GPT-3.5 API', 'Prompt engineering', 'Synty Polygon assets'],
    description: [
      'Early 2023, shortly after ChatGPT came out, I explored what large language models could bring to narrative games. I built a third-person Unity prototype in a Roman city where every NPC is driven by GPT-3.5: the player walks up to a character and types freely, and the character answers in role, in period and in keeping with its personality.',
      'On top of the raw model I designed the systems that make characters believable: a persona and world description per NPC, memory of past exchanges, emotional reactions (positive/neutral/negative) shown through dialogue bubbles and animations, awareness of their surroundings and identity, a reputation system that changes how NPCs treat the player, and NPC-to-NPC conversations that the player can listen to or interrupt.'
    ],
    highlights: [
      'Free-text dialogue with in-character, context-aware NPCs',
      'Memory, emotions, reputation and pre-established relationships between characters',
      'Autonomous NPC-to-NPC conversations',
      'Thesis report, poster and video demo'
    ],
    links: [{ label: 'Demo video playlist (YouTube)', href: 'https://www.youtube.com/playlist?list=PLLFg8Srr2zyfPAHZ5tPzuOX-OnzgD0ukG' }]
  },
  {
    id: 'dnd-copilot',
    level: 'bsc', kind: 'Project',
    title: 'D&D Copilot: an AI assistant for game masters',
    summary: 'Semester project using GPT-3 to help Dungeons & Dragons game masters generate characters and interactions from campaign material, with voice input experiments.',
    institution: 'HEPIA', course: 'Semester project',
    period: 'Nov 2022 – Jan 2023', date: '2023-01', team: 'Pair (with Thibault Chatillon)',
    domains: ['Machine Learning', 'Software & Web'],
    tech: ['Python', 'OpenAI GPT-3', 'Flask', 'Google Speech-to-Text', 'Picovoice'],
    description: [
      'We ran a product-vision workshop (users, needs, value proposition, success criteria) and broke a game master’s job into tasks that could be assisted. We then scraped and cleaned a published campaign into structured text, generated NPC descriptions and interactions with GPT-3 from that material, and prototyped live speech transcription so the tool could listen to the table.'
    ]
  },
  {
    id: 'bloom-dating-app',
    level: 'bsc', kind: 'Project',
    title: 'Bloom: a desktop dating app',
    summary: 'Orientation project: a JavaFX app with profiles, interest tags, swiping, matching and chat.',
    institution: 'HEPIA', course: 'Orientation project',
    period: 'Mar – Jun 2022', date: '2022-06', team: 'Team of 4 (Thibault Chatillon, Yannis Chamot, Tiago Gama Ferreira)',
    domains: ['Software & Web'],
    tech: ['Java', 'JavaFX / FXML', 'Maven', 'JSON'],
    description: ['Profile cards with interest tags, a scrolling feed, like/dismiss, a matching algorithm and a chat view. The repository lives under my GitLab account, where I was one of the four main committers; only code I wrote is shown here.']
  },
  {
    id: 'hechat',
    level: 'bsc', kind: 'Project',
    title: 'Hechat: a team chat platform',
    summary: 'Software-engineering project: a Discord-style chat for the school, with servers, channels, roles and real-time messaging.',
    institution: 'HEPIA', course: 'Software Engineering',
    period: 'Oct 2022 – Apr 2023', date: '2023-04', team: 'Team of 5 (Dylan Peiry, Yannis Chamot, Scott Birner, Damian Boquete)',
    domains: ['Software & Web', 'Cloud & Distributed'],
    tech: ['TypeScript', 'Node.js / Express', 'Prisma', 'MongoDB', 'Socket.IO', 'Docker', 'Svelte', 'Flutter'],
    description: [
      'Run as a Scrum project with a web client, a Flutter mobile client and a REST + WebSocket API. I was one of the two main contributors to the API (servers, channels, members, messages), with its Prisma data model and documentation.'
    ]
  },
  {
    id: 'oco-thornfire',
    level: 'bsc', kind: 'Project',
    title: 'Thornfire: RFID tag management',
    summary: 'IoT project: reading RFID tags with an industrial antenna and managing them through an API and a web interface.',
    institution: 'HEPIA', course: 'Communicating Objects (IoT)',
    period: 'Nov – Dec 2022', date: '2022-12', team: 'Team of 3 (Dylan Peiry, Damian Boquete)',
    domains: ['Systems & Embedded', 'Software & Web'],
    tech: ['Python (pyserial)', 'TypeScript', 'Express', 'Prisma', 'SQLite', 'SvelteKit'],
    description: ['A Python reader talks to a Bluebox RFID antenna over its serial protocol; a TypeScript/Prisma API stores tags, teams and scans; a SvelteKit client manages them. Delivered in iterations with activity reports, plus a field-test plan to measure tag range and reception on a boat for a sailing-race use case.']
  },
  {
    id: 'android-weather',
    level: 'bsc', kind: 'Lab',
    title: 'Android weather app in Kotlin',
    summary: 'A list of cities stored in SQLite, with live weather from the OpenWeatherMap API.',
    institution: 'HEPIA', course: 'Mobile Development',
    period: 'Nov 2022', date: '2022-11', team: 'Solo',
    domains: ['Mobile & Games'],
    tech: ['Kotlin', 'Android SDK', 'Retrofit', 'SQLite', 'RecyclerView'],
    description: ['Cities are saved in a local database and shown as cards; opening one fetches the current weather with Retrofit and binds it to the UI.']
  },
  {
    id: 'android-findmygoomba',
    level: 'bsc', kind: 'Project',
    title: 'FindMyGoomba: an outing tracker on Google Maps',
    summary: 'Live geolocation, markers on Google Maps and journeys saved locally.',
    institution: 'HEPIA', course: 'Mobile Development',
    period: 'Dec 2022 – Jan 2023', date: '2023-01', team: 'Pair (with Damian Boquete)',
    domains: ['Mobile & Games'],
    tech: ['Kotlin', 'Android SDK', 'Google Maps', 'Fused location', 'Room / SQLite'],
    description: ['Fragments for the map and the history, live location tracking, markers along the way, and journeys stored locally and browsed in a list.']
  },
  {
    id: 'cloud-deployment',
    level: 'bsc', kind: 'Lab series',
    title: 'Deploying on five IaaS clouds and on Kubernetes',
    summary: 'The same application deployed through each provider’s API, then on Kubernetes with services and replicas.',
    institution: 'HEPIA', course: 'Cloud & Deployment',
    period: 'Sep – Nov 2022', date: '2022-11', team: 'Group of 5 for the IaaS study · solo for Kubernetes',
    domains: ['Cloud & Distributed'],
    tech: ['Google Cloud', 'Exoscale', 'Kubernetes', 'minikube', 'Redis', 'Python'],
    parts: [
      { title: 'IaaS comparison', text: 'Scripted deployments with each provider’s API (I covered Google Compute Engine and Exoscale) and a group comparison of five providers.' },
      { title: 'Kubernetes', text: 'Frontend, API and Redis deployed on minikube with services and replicas.' }
    ]
  },
  {
    id: 'cloud-serverless',
    level: 'bsc', kind: 'Lab',
    title: 'Serverless functions on AWS, Google Cloud, Azure and OpenWhisk',
    summary: 'One function backed by three cloud databases, load-tested with JMeter, plus cold-start measurements.',
    institution: 'HEPIA', course: 'Cloud & Deployment',
    period: 'Nov – Dec 2022', date: '2022-12', team: 'Solo',
    domains: ['Cloud & Distributed'],
    tech: ['AWS Lambda', 'DynamoDB', 'Google Cloud Functions', 'Datastore', 'Azure Functions', 'CosmosDB', 'JMeter', 'OpenWhisk'],
    description: ['The same function deployed on three providers with their own NoSQL database, load tests with JMeter to compare latency and scaling, and cold vs warm start times on Apache OpenWhisk.']
  },
  {
    id: 'cloud-iac',
    level: 'bsc', kind: 'Lab',
    title: 'Infrastructure as code: a GitLab CI/CD pipeline with Terraform and Ansible',
    summary: 'Merging a feature branch provisions OpenStack servers, tests the web app, deploys it, and can tear it all down.',
    institution: 'HEPIA', course: 'Cloud & Deployment',
    period: 'Dec 2022 – Jan 2023', date: '2023-01', team: 'Solo (Terraform lab) · pair with Damian Boquete (pipeline)',
    domains: ['Cloud & Distributed'],
    tech: ['Terraform', 'Ansible', 'GitLab CI', 'OpenStack (SWITCHengines)'],
    parts: [
      { title: 'Terraform lab (solo)', text: 'Provisioning an instance on the SWITCHengines OpenStack cloud with Terraform, inspecting the state Terraform keeps (terraform state list / show), then changing the image and the instance name and applying again.' },
      { title: 'CI/CD pipeline (pair)', text: 'A semi-automatic pipeline: Terraform (re)provisions the infrastructure when the plan changes, unit tests run when the app changes, Ansible deploys on merge, and a manual stage destroys everything. Damian wrote most of the Terraform and pipeline code of this part; I drew the pipeline and wrote the report.' }
    ]
  },
  {
    id: 'distributed-broadcast',
    level: 'bsc', kind: 'Lab',
    title: 'Broadcast and voting between blockchain nodes',
    summary: 'Six socket-connected nodes relay transactions to their neighbours and vote, configured from YAML.',
    institution: 'HEPIA', course: 'Distributed Systems',
    period: 'Oct 2022', date: '2022-10', team: 'Solo',
    domains: ['Cloud & Distributed'],
    tech: ['Python', 'Sockets', 'YAML'],
    description: ['A client node and server nodes built from YAML files exchange transactions through a broadcast algorithm over TCP sockets, with a vote and a “fake transaction” scenario to test the network’s behaviour.']
  },
  {
    id: 'distributed-freenet',
    level: 'bsc', kind: 'Lab',
    title: 'The FreeNet search algorithm over sockets',
    summary: 'Key-based search across a network of proactive and reactive nodes.',
    institution: 'HEPIA', course: 'Distributed Systems',
    period: 'Nov – Dec 2022', date: '2022-12', team: 'Pair (with Damian Boquete)',
    domains: ['Cloud & Distributed'],
    tech: ['Python', 'Sockets', 'YAML'],
    description: ['Each node loads its neighbours from YAML; a proactive node starts a search and reactive nodes forward it depth-first with FreeNet’s rules until the key is found, then the path is returned.']
  },
  {
    id: 'distributed-object-storage',
    level: 'bsc', kind: 'Lab',
    title: 'Deploying the blockchain nodes on the cloud with object storage',
    summary: 'The broadcast network deployed on Exoscale instances, with node data kept in S3 buckets.',
    institution: 'HEPIA', course: 'Distributed Systems',
    period: 'Nov 2022', date: '2022-11', team: 'Solo',
    domains: ['Cloud & Distributed'],
    tech: ['Python', 'Exoscale API', 'S3 object storage', 'cloud-init', 'Sockets'],
    description: ['A script creates the instances (with cloud-init) if they do not exist, nodes read their configuration and transactions from S3 buckets, and the client/server nodes communicate across the cloud.']
  },
  {
    id: 'hpc-exam',
    level: 'bsc', kind: 'Project',
    title: 'Batch image convolution with MPI and threads',
    summary: 'Practical exam: a convolution over a batch of images, parallelised two ways and benchmarked from 1 to 64 processes.',
    institution: 'HEPIA', course: 'HPC & Big Data',
    period: 'Apr 2023', date: '2023-04', team: 'Solo',
    domains: ['Systems & Embedded', 'Algorithms & Math'],
    tech: ['Julia', 'MPI.jl', 'Threads', 'SLURM'],
    description: ['Images are split across MPI ranks (or threads), each convolved with the kernel, and SLURM batch scripts run the job with 1 to 64 processes to plot run time and speed-up.']
  },
  {
    id: 'hepia-machine-learning',
    level: 'bsc', kind: 'Lab series',
    title: 'Machine learning from scratch: perceptron, MLP and decision trees',
    summary: 'A perceptron and a multilayer perceptron written without ML libraries, then decision trees, on student grades and Iris. Re-run for this site.',
    institution: 'HEPIA', course: 'AI & Machine Learning',
    period: 'Oct – Nov 2022', date: '2022-11', team: 'Pair (with Damian Boquete)',
    domains: ['Machine Learning'],
    tech: ['Python', 'NumPy', 'scikit-learn', 'Matplotlib'],
    parts: [
      { title: 'Perceptron', text: 'A perceptron class with gradient-descent training on normalised student grades (pass/fail), reaching 100 % on the training set, and the OR and AND functions.' },
      { title: 'Multilayer perceptron', text: 'Layers of perceptrons with back-propagation, assembled into a configurable model.' },
      { title: 'Decision trees', text: 'Trees with scikit-learn on the same grades and on Iris, printed and plotted.' },
      { title: 'k-means', text: 'The first lab of the series has its own page.' }
    ]
  },
  {
    id: 'hepia-kmeans',
    level: 'bsc', kind: 'Lab',
    title: 'k-means clustering on student grades and Iris',
    summary: 'k-means with the Manhattan distance, written from scratch: student grades clustered with one plot per iteration, then the four-dimensional Iris data.',
    institution: 'HEPIA', course: 'AI & Machine Learning',
    period: 'Oct 2022', date: '2022-10', team: 'Pair (with Damian Boquete)',
    domains: ['Machine Learning'],
    tech: ['Python', 'Matplotlib'],
    description: [
      'Centroids start at random inside the bounding box of the data; each point joins its nearest centroid by Manhattan distance, each centroid moves to the mean of its cluster, and the loop stops once the centroid movement settles. On the student grades (two marks per student, from 2 to 7 clusters chosen on the command line) every iteration is drawn as its own plot, clusters in colour and centroids as crosses.',
      'The same loop runs on Iris in four dimensions with one cluster per species. After each iteration the program prints every cluster’s composition, its most common species and its total distance to the centroid: in the run shown here, setosa ends up alone in its cluster and the other two clusters are 95 % virginica and 76 % versicolor.'
    ]
  },
  {
    id: 'hepia-cnn',
    level: 'bsc', kind: 'Lab',
    title: 'CNNs and transfer learning',
    summary: 'Pretrained VGG16, Xception and MobileNet adapted with transfer learning and fine-tuning, and a custom CNN on (Fashion-)MNIST.',
    institution: 'HEPIA', course: 'AI & Machine Learning',
    period: 'Dec 2022', date: '2022-12', team: 'Pair (with Damian Boquete)',
    domains: ['Machine Learning', 'Vision & Graphics'],
    tech: ['Python', 'TensorFlow / Keras', 'VGG16', 'Xception', 'MobileNet'],
    description: ['We compared three pretrained networks on our own animal photos (avocado, cat, cow, crab), adapted them with transfer learning and fine-tuning when the predictions were poor, and built a custom convolutional network for MNIST and Fashion-MNIST with its training curves. Presented in class as a short talk.']
  },
  {
    id: 'image-processing-vision',
    level: 'bsc', kind: 'Lab series',
    title: 'Digital image processing: filters and the Hough transform',
    summary: 'Intensity transforms and spatial filtering, and a Hough line detector written from scratch.',
    institution: 'HEPIA', course: 'Digital Image Processing',
    period: 'Feb – Jun 2022', date: '2022-06', team: 'Solo',
    domains: ['Vision & Graphics'],
    tech: ['Python', 'NumPy', 'Pillow', 'OpenCV', 'Matplotlib'],
    parts: [
      { title: 'Labs', text: 'Image manipulation, intensity transforms, correlation/convolution and its cost, smoothing and edge detection.' },
      { title: 'Hough transform', text: 'Line detection: a Sobel edge map (OpenCV) thresholded by my own code, then the Hough accumulator and the peak extraction written from scratch. Re-run for this site on its chessboard test image.' },
      { title: 'OCR', text: 'The course project, a digit-recognition web app, has its own page.' }
    ]
  },
  {
    id: 'hepial-compiler',
    level: 'bsc', kind: 'Project',
    title: 'A compiler for HEPIAL, targeting the JVM',
    summary: 'Lexer, parser, semantic analysis and bytecode generation for a small Pascal-like language.',
    institution: 'HEPIA', course: 'Compiler Techniques',
    period: 'Nov 2021 – Jan 2022', date: '2022-01', team: 'Pair (with Lucas Landrecy)',
    domains: ['Software & Web', 'Algorithms & Math'],
    tech: ['Java', 'JFlex', 'CUP', 'Jasmin / JVM bytecode'],
    description: ['JFlex tokens and a CUP grammar build an abstract syntax tree; visitor-based passes check types and scopes, regenerate source code, and emit Jasmin assembly for the JVM (expressions, conditions, loops, constants). Presented and defended in front of the teachers.']
  },
  {
    id: 'cff-shortest-paths',
    level: 'bsc', kind: 'Project',
    title: 'Shortest paths on the Swiss rail network',
    summary: 'Floyd–Warshall and Dijkstra on a graph of Swiss cities loaded from XML, with edits and connectivity checks.',
    institution: 'HEPIA', course: 'Advanced Algorithms',
    period: 'Mar – Apr 2022', date: '2022-04', team: 'Team of 3 (Damian Boquete, Dylan Peiry)',
    domains: ['Algorithms & Math'],
    tech: ['Java', 'XML (DOM)'],
    description: ['An interactive console program: weight matrix, Floyd–Warshall travel times and predecessors, Dijkstra tables and paths between two cities, adding/removing cities and links, connectivity check and XML export. Tested automatically against reference outputs. I was the main committer. The same group also worked Floyd–Warshall and maximum-flow problems by hand.']
  },
  {
    id: 'geometry-raytracer',
    level: 'bsc', kind: 'Lab series',
    title: 'Ray tracing and Phong shading from scratch',
    summary: 'Computational-geometry labs: a ray tracer written in plain JavaScript on a 2D canvas, and a Phong fragment shader in GLSL.',
    institution: 'HEPIA', course: 'Computational Geometry',
    period: 'Mar – May 2022', date: '2022-05', team: 'Team of 3 (group 7, with Damian Boquete and Dylan Peiry)',
    domains: ['Vision & Graphics', 'Algorithms & Math'],
    tech: ['JavaScript', 'Canvas 2D', 'GLSL', 'Linear algebra'],
    description: [
      'No graphics library: we wrote the matrix and vector maths (products, inverse, transpose, reflection, refraction), ray–triangle intersection and Phong lighting by hand, then cast one ray per pixel through a 350×350 canvas in progressive passes. Keyboard controls rotate the object and move the light. A second lab implemented the same Phong model as a fragment shader with ambient, diffuse and specular modes, with written answers on normal matrices and varyings.',
      'For this site I ran our script again, unchanged, in a headless browser and captured what it draws.'
    ]
  },
  {
    id: 'string-search',
    level: 'bsc', kind: 'Project',
    title: 'String search algorithms in TypeScript',
    summary: 'Rabin–Karp, Knuth–Morris–Pratt and Boyer–Moore implemented side by side in a command-line tool.',
    institution: 'HEPIA', course: 'Advanced Algorithms',
    period: 'Apr – May 2022', date: '2022-05', team: 'Team of 3 (group 7, with Damian Boquete and Dylan Peiry)',
    domains: ['Algorithms & Math'],
    tech: ['TypeScript', 'Node.js'],
    description: [
      'The tool searches a pattern in a text file with the algorithm you pick and prints every comparison, so the strategies can be compared step by step: Rabin–Karp with a rolling hash, Knuth–Morris–Pratt with its prefix table, and Boyer–Moore scanning the pattern right to left.',
      'Re-run for this site: compiled as-is, the three algorithms report the same occurrences.'
    ]
  },
  {
    id: 'concurrency-shortest-paths',
    level: 'bsc', kind: 'Lab',
    title: 'Parallel all-pairs shortest paths with POSIX threads',
    summary: 'Floyd–Warshall split across threads, timed against the sequential version.',
    institution: 'HEPIA', course: 'Concurrent Programming',
    period: 'Mar 2022', date: '2022-03', team: 'Pair (with Damian Boquete)',
    domains: ['Systems & Embedded', 'Algorithms & Math'],
    tech: ['C', 'pthreads', 'Barriers', 'Make'],
    description: ['Rows of the distance matrix are shared among T threads that synchronise with a barrier at every step, and both versions were timed over repeated runs. On the course’s 10 × 10 grid the threads only add overhead (3 ms sequential against 57 ms threaded); once each path step carries simulated work, the threaded version wins, 72 ms against 429 ms.']
  },
  {
    id: 'concurrency-neighbour-sort',
    level: 'bsc', kind: 'Lab',
    title: 'Parallel neighbour sort',
    summary: 'An array of N values sorted by T threads, each owning a zone and synchronising at a barrier.',
    institution: 'HEPIA', course: 'Concurrent Programming',
    period: 'Apr 2022', date: '2022-04', team: 'Pair (with Damian Boquete)',
    domains: ['Systems & Embedded', 'Algorithms & Math'],
    tech: ['C', 'pthreads', 'Mutexes', 'Barriers'],
    description: ['Each thread bubble-sorts its own zone, neighbours exchange their boundary values under a mutex, and a barrier repeats the rounds until the whole array is sorted; the flowchart and report document the design.']
  },
  {
    id: 'concurrency-traffic-lights',
    level: 'bsc', kind: 'Lab',
    title: 'Traffic-light simulation with condition variables',
    summary: 'Cars and traffic lights modelled as threads sharing road sections.',
    institution: 'HEPIA', course: 'Concurrent Programming',
    period: 'May – Jun 2022', date: '2022-06', team: 'Pair (with Damian Boquete)',
    domains: ['Systems & Embedded'],
    tech: ['C', 'pthreads', 'Condition variables'],
    description: ['Each car and each traffic light is a thread; condition variables make cars wait for green and for free road sections, while another thread displays the occupancy of the sections.']
  },
  {
    id: 'database-design',
    level: 'bsc', kind: 'Project',
    title: 'Relational database design',
    summary: 'From an entity-association model to an SQLite schema with triggers, indexes and analytical queries.',
    institution: 'HEPIA', course: 'Databases',
    period: 'Jun 2022', date: '2022-06', team: 'Solo',
    domains: ['Software & Web'],
    tech: ['SQL', 'SQLite', 'draw.io'],
    description: ['Modelled a quiz platform (users, categories, questions, answers, suggestions), derived the relational model, implemented it with constraints, triggers and indexes, and wrote the queries.']
  },
  {
    id: 'appsec-go',
    level: 'bsc', kind: 'Project',
    title: 'Securing a REST API in Go',
    summary: 'Building a Go API, then hardening it step by step: TLS, authentication, OpenID Connect and secret management.',
    institution: 'HEPIA', course: 'Application Security',
    period: 'Sep 2021 – Jan 2022', date: '2022-01', team: 'Solo',
    domains: ['Security', 'Software & Web'],
    tech: ['Go', 'Gin', 'Docker Compose', 'Nginx', 'TLS', 'Okta (OIDC)'],
    description: ['A RESTful API containerised with Docker, placed behind an Nginx TLS reverse proxy, protected first with basic authentication and then with OpenID Connect through Okta, with credentials moved out of the code into environment-based secrets.']
  },
  {
    id: 'sr-elgamal',
    level: 'bsc', kind: 'Lab',
    title: 'El Gamal digital signatures from scratch',
    summary: 'Key generation, signing and verification implemented with my own modular arithmetic.',
    institution: 'HEPIA', course: 'Network Security in Practice',
    period: 'Oct 2021', date: '2021-10', team: 'Solo (individual report)',
    domains: ['Security', 'Algorithms & Math'],
    tech: ['Python'],
    description: ['My own modular-arithmetic helpers (primality, generators, modular inverse, exponentiation), then key generation, signature and verification of a message, with the report explaining each step.']
  },
  {
    id: 'sr-dos',
    level: 'bsc', kind: 'Lab',
    title: 'Denial-of-service attack and defence',
    summary: 'TP2: flooding a web server with HTTP requests from a Python script, observing the effect, and protecting it.',
    institution: 'HEPIA', course: 'Network Security in Practice',
    period: 'Nov 2021', date: '2021-11', team: 'Pair (with Nikola Antonijevic)',
    domains: ['Security'],
    tech: ['Python (requests, threads)', 'Linux', 'iptables'],
    description: ['Two virtual machines: a web server hosting a large image and an attacker. Our Python script requests the image in a loop, first sequentially (the server copes), then from 1,000 threads at once until the server starts failing; we then rate-limit new connections from one source to four per second with iptables and discuss blacklisting.']
  },
  {
    id: 'sr-dns',
    level: 'bsc', kind: 'Lab',
    title: 'Setting up and spoofing DNS',
    summary: 'TP3: a DNS server configured from scratch, then attacked three ways so a victim resolves microsoft.com to the attacker.',
    institution: 'HEPIA', course: 'Network Security in Practice',
    period: 'Dec 2021 – Jan 2022', date: '2022-01', team: 'Pair (with Nikola Antonijevic)',
    domains: ['Security'],
    tech: ['BIND (DNS)', 'Ettercap', 'Wireshark', 'Linux', 'VMware'],
    description: ['Three virtual machines (DNS server, client, attacker). We configured the server and a zone, then attacked the client’s name resolution three ways: editing the hosts file, DNS (ARP) spoofing with Ettercap, and poisoning the server’s cache, with the forged answers captured in Wireshark and the defences discussed.']
  },
  {
    id: 'sr-firewall-vpn',
    level: 'bsc', kind: 'Lab',
    title: 'pfSense firewall and OpenVPN',
    summary: 'Filtering a small network with pfSense rules and connecting a remote client through an OpenVPN tunnel.',
    institution: 'HEPIA', course: 'Network Security in Practice',
    period: 'Dec 2021', date: '2021-12', team: 'Pair (with Nikola Antonijevic)',
    domains: ['Security'],
    tech: ['pfSense', 'OpenVPN', 'VirtualBox'],
    description: ['Firewall rules on pfSense for the lab network, then an OpenVPN server on pfSense and a client connecting through the tunnel.']
  },
  {
    id: 'sr-kerberos',
    level: 'bsc', kind: 'Lab',
    title: 'Kerberos single sign-on for SSH',
    summary: 'A Heimdal KDC and a “kerberised” SSH service: log in once, then reach the server with a ticket.',
    institution: 'HEPIA', course: 'Network Security in Practice',
    period: 'Jan 2022', date: '2022-01', team: 'Pair (with Nikola Antonijevic)',
    domains: ['Security'],
    tech: ['Kerberos (Heimdal)', 'SSH', 'Linux'],
    description: ['Realm and KDC set-up, service principals and keytabs, and SSH authentication with Kerberos tickets instead of passwords.']
  },
  {
    id: 'ssi-certification',
    level: 'bsc', kind: 'Lab',
    title: 'Certificates and a private certificate authority',
    summary: 'TP1: creating a certificate authority with OpenSSL, signing server certificates and serving HTTPS with them.',
    institution: 'HEPIA', course: 'Information Security & Cryptography',
    period: 'Mar 2021', date: '2021-03', team: 'Pair (with Valentin Acevedo)',
    domains: ['Security'],
    tech: ['OpenSSL', 'PKI / X.509', 'Apache', 'HTTPS'],
    description: ['Moving an Apache2 site from http://localhost to HTTPS step by step: a root CA, certificate signing requests, signed server certificates and the chain of trust, installed in the server and trusted by the browser.']
  },
  {
    id: 'ssi-idea',
    level: 'bsc', kind: 'Lab',
    title: 'The simplified IDEA block cipher in Python',
    summary: 'TP2: key schedule, encryption and decryption rounds of a simplified IDEA, written from scratch and tested.',
    institution: 'HEPIA', course: 'Information Security & Cryptography',
    period: 'May 2021', date: '2021-05', team: 'Pair (with Valentin Acevedo)',
    domains: ['Security', 'Algorithms & Math'],
    tech: ['Python'],
    description: ['Modular addition and multiplication, XOR, sub-key generation and the inverse keys for decryption, then encryption and decryption of messages with a test procedure.']
  },
  {
    id: 'ssi-pgp',
    level: 'bsc', kind: 'Lab',
    title: 'Pretty Good Privacy with GnuPG',
    summary: 'TP3: key pairs, encryption, signatures and the web of trust in practice.',
    institution: 'HEPIA', course: 'Information Security & Cryptography',
    period: 'Jun 2021', date: '2021-06', team: 'Pair (with Valentin Acevedo)',
    domains: ['Security'],
    tech: ['GnuPG', 'PGP'],
    description: ['How PGP combines symmetric and public-key cryptography, then generating keys, exchanging and signing public keys, and encrypting and signing messages with GnuPG.']
  },
  {
    id: 'ssi-passwords',
    level: 'bsc', kind: 'Lab',
    title: 'Password cracking with John the Ripper',
    summary: 'TP4: single-crack, dictionary and incremental attacks on hashed passwords, and what makes a password resist them.',
    institution: 'HEPIA', course: 'Information Security & Cryptography',
    period: 'Jun 2021', date: '2021-06', team: 'Pair (with Valentin Acevedo)',
    domains: ['Security'],
    tech: ['John the Ripper', 'Linux', 'Hash functions'],
    description: ['Cracking shadow-file hashes with John’s single, wordlist and incremental modes, word-mangling rules, and an analysis of hashing performance and password strength.']
  },
  {
    id: 'numerical-integration',
    level: 'bsc', kind: 'Project',
    title: 'Numerical integration and convolution in C',
    summary: 'Rectangle and trapezoid rules with error analysis, 1D signal convolution, and 2D convolution filters on images.',
    institution: 'HEPIA', course: 'Mathematics for IT',
    period: 'Mar – Apr 2022', date: '2022-04', team: 'Pair (with Damian Boquete)',
    domains: ['Algorithms & Math', 'Signal Processing'],
    tech: ['C', 'SDL', 'PGM images', 'Make'],
    description: ['Implemented and compared numerical integration rules (error vs number of intervals), used them to convolve signals with filters, and generalised convolution to 2D kernels to blur and detect edges in images. Results documented in a 19-page report.']
  },
  {
    id: 'math-rsa',
    level: 'bsc', kind: 'Lab',
    title: 'RSA: key generation and breaking a small key',
    summary: 'RSA implemented from the maths up, then attacked by factoring a small modulus.',
    institution: 'HEPIA', course: 'Mathematics for IT',
    period: 'Dec 2020', date: '2020-12', team: 'Group of 4 (Valentin Acevedo, Darius Briquet, Tanguy Cavagna)',
    domains: ['Algorithms & Math', 'Security'],
    tech: ['Python'],
    description: ['Key generation, fast modular exponentiation, the extended Euclidean algorithm, encryption and decryption, then the attack: factor the public modulus, compute Euler’s totient, invert the public exponent and decrypt. Re-run for this site, our code still decrypts the course’s message from its public key alone.']
  },
  {
    id: 'math-reed-solomon',
    level: 'bsc', kind: 'Lab',
    title: 'Reed–Solomon error correction',
    summary: 'Polynomials over a prime field to encode messages and recover them after corruption.',
    institution: 'HEPIA', course: 'Applied Mathematics',
    period: 'Mar 2021', date: '2021-03', team: 'Group of 4 (Valentin Acevedo, Darius Briquet, Tanguy Cavagna)',
    domains: ['Algorithms & Math'],
    tech: ['Python'],
    description: ['A small polynomial package (addition, product, subtraction, evaluation, Lagrange interpolation modulo a prime) used to decode a corrupted Reed–Solomon message.']
  },
  {
    id: 'math-fourier',
    level: 'bsc', kind: 'Lab series',
    title: 'Fourier transforms: audio tricks and a hidden image',
    summary: 'The DFT/FFT applied to sound files, then FFT filtering that reveals a picture hidden in noise. Re-run for this site.',
    institution: 'HEPIA', course: 'Applied Mathematics · Mathematics for IT',
    period: 'May 2021 – Apr 2022', date: '2022-04', team: 'Group of 4 (audio) · solo (image)',
    domains: ['Algorithms & Math', 'Signal Processing'],
    tech: ['Python', 'NumPy (FFT)', 'Matplotlib', 'WAV audio'],
    parts: [
      { title: 'Audio', text: 'Complex Fourier series with the FFT on WAV files: mirroring the spectrum and shifting notes, and decoding the course’s hidden messages.' },
      { title: 'Image', text: 'A 2D FFT keeps only the lowest frequencies of an image that looks like pure noise; the inverse FFT reveals the hidden picture.' }
    ]
  },
  {
    id: 'math-optimisation',
    level: 'bsc', kind: 'Lab',
    title: 'Linear regression by gradient descent in C',
    summary: 'Least squares solved by gradient descent on several data sets, checked in Python.',
    institution: 'HEPIA', course: 'Mathematics for IT',
    period: 'Dec 2021', date: '2021-12', team: 'Pair (with Nikola Antonijevic)',
    domains: ['Algorithms & Math', 'Machine Learning'],
    tech: ['C', 'Python', 'Matplotlib'],
    description: ['The error function and its gradient derived by hand, gradient descent implemented in C on random and given point sets, and the fitted lines plotted in Python to validate the result.']
  },
  {
    id: 'physics-simulations',
    level: 'bsc', kind: 'Project',
    title: 'Galaxy simulation in C',
    summary: 'An N-body simulation of stars orbiting a black hole, rendered in real time with SDL.',
    institution: 'HEPIA', course: 'Physics for Engineering',
    period: 'Dec 2020 – Jan 2021', date: '2021-01', team: 'Solo',
    domains: ['Algorithms & Math', 'Vision & Graphics'],
    tech: ['C', 'SDL2', 'Make'],
    description: ['A small 2D vector library, random star generation, resulting gravitational forces, orbital initial speeds and a numerical integrator, drawn frame by frame. The follow-up lab on electric field lines has its own page.']
  },
  {
    id: 'physics-electric-field',
    level: 'bsc', kind: 'Lab',
    title: 'Electric field lines in C',
    summary: 'Field lines of point charges traced by following the normalised field step by step.',
    institution: 'HEPIA', course: 'Physics for Engineering',
    period: 'May 2021', date: '2021-05', team: 'Pair (with Damian Boquete)',
    domains: ['Algorithms & Math', 'Vision & Graphics'],
    tech: ['C', 'SDL2', 'Make'],
    description: [
      'Eight point charges of random magnitude, four positive and four negative, sit in the unit square, and the field at any point is the sum of their Coulomb fields. From 1,000 random starting points, each field line follows the normalised field one pixel-sized step at a time, along the field in red and against it in blue, until it comes close to a charge or leaves the window. Lines are drawn with a Bresenham routine, octant by octant, and charges as circles marked with their sign.',
      'A group lab with Damian Boquete: we each started our own version, then finished his together, with my debugging and improvements, and submitted it as our common work.'
    ]
  },
  {
    id: 'quadtree-compression',
    level: 'bsc', kind: 'Project',
    title: 'Quadtree image compression',
    summary: 'Images stored as quadtrees: lossy compression by pruning, symmetries computed on the tree.',
    institution: 'HEPIA', course: 'Sequential Programming in C',
    period: 'May 2021', date: '2021-05', team: 'Solo',
    domains: ['Algorithms & Math', 'Vision & Graphics'],
    tech: ['C', 'PGM', 'Make'],
    description: ['Matrix ↔ quadtree conversion with bit-level indexing, compression by merging leaves under a variance threshold, horizontal/vertical/central symmetries done by swapping subtrees, ASCII and binary PGM I/O. Presented with slides.']
  },
  {
    id: 'pgm-image-processing',
    level: 'bsc', kind: 'Project',
    title: 'Image processing library in C',
    summary: 'Reading/writing PGM images and implementing classic transforms from scratch.',
    institution: 'HEPIA', course: 'Sequential Programming in C',
    period: 'Nov 2020', date: '2020-11', team: 'Solo',
    domains: ['Vision & Graphics'],
    tech: ['C', 'PGM', 'Make'],
    description: ['Negative, symmetries, crop, convolution filters and the “photomaton” transform, applied to the classic mandrill test image.']
  },
  {
    id: 'scala-fp',
    level: 'bsc', kind: 'Project',
    title: 'ScalaFlix: functional programming in Scala',
    summary: 'A TV-series catalogue queried with immutable collections and higher-order functions, peer-reviewed by classmates.',
    institution: 'HEPIA', course: 'Functional Programming',
    period: 'Feb – Apr 2023', date: '2023-04', team: 'Team of 4 (Damian Boquete, Scott Birner, Dylan Peiry)',
    domains: ['Software & Web'],
    tech: ['Scala', 'sbt'],
    description: ['Case classes for series, seasons, episodes and actors; queries written with map, filter, flatMap and folds over List, Set and Map. Another team reviewed the code.']
  },
  {
    id: 'linux-kernel-module',
    level: 'bsc', kind: 'Lab',
    title: 'A Linux character-device driver',
    summary: 'A loadable kernel module exposing /dev/abcd with its own circular buffer.',
    institution: 'HEPIA', course: 'Operating Systems',
    period: 'Jun 2022', date: '2022-06', team: 'Solo',
    domains: ['Systems & Embedded'],
    tech: ['C', 'Linux kernel API', 'Make'],
    description: ['The driver allocates a per-open circular buffer, implements open/read/write/release with copy_to_user/copy_from_user, and is tested by small user-space programs; the questions explore what happens at the buffer boundaries.']
  },
  {
    id: 'os-mini-shell',
    level: 'bsc', kind: 'Lab',
    title: 'A Unix shell in C',
    summary: 'Foreground and background jobs, pipes, redirections, cd/exit built-ins and signal handling.',
    institution: 'HEPIA', course: 'Operating Systems',
    period: 'May 2022', date: '2022-05', team: 'Solo',
    domains: ['Systems & Embedded'],
    tech: ['C', 'POSIX (fork, exec, pipe, dup2, sigaction)', 'Make'],
    description: ['Parses a command line, runs it with fork/execvp, connects two commands with an anonymous pipe, redirects input and output to files, runs jobs in the background, and handles SIGCHLD, SIGINT, SIGTERM, SIGQUIT and SIGHUP. Re-built and tested again for this site.']
  },
  {
    id: 'os-sockets',
    level: 'bsc', kind: 'Lab',
    title: 'A TCP client–server game',
    summary: 'A number-guessing game over TCP sockets, one exchange loop per client.',
    institution: 'HEPIA', course: 'Operating Systems',
    period: 'May 2022', date: '2022-05', team: 'Solo',
    domains: ['Systems & Embedded', 'Cloud & Distributed'],
    tech: ['C', 'BSD sockets', 'Make'],
    description: ['The server picks a number per client and answers each guess; both sides use full-read/full-write helpers over a small binary protocol.']
  },
  {
    id: 'ultra-cp',
    level: 'bsc', kind: 'Lab',
    title: 'ultra-cp: listing and copying directory trees in C',
    summary: 'A recursive listing and incremental copy tool built on lstat, opendir and file descriptors, plus Bash scripting.',
    institution: 'HEPIA', course: 'Systems Programming',
    period: 'Oct 2021 – Jan 2022', date: '2022-01', team: 'Solo',
    domains: ['Systems & Embedded'],
    tech: ['C', 'POSIX file API', 'Bash', 'AddressSanitizer'],
    parts: [
      { title: 'ultra-cp', text: 'Walks a directory tree and prints type, permissions, size, date and path for each entry, plus a copy mode that only rewrites files whose size or date changed. Rebuilt today with -Wall -Wextra -pedantic and the sanitizers: no warnings.' },
      { title: 'Bash', text: 'Scripts such as get-groups, which lists the groups of a user from /etc/passwd and /etc/group.' }
    ]
  },
  {
    id: 'sealos-kernel',
    metrics: ['Boots under GRUB', 'Interrupts, timer, keyboard', 'Paging & user-mode tasks'],
    level: 'bsc', kind: 'Lab series',
    title: 'SealOS: a small x86 kernel, built lab by lab',
    summary: 'A 32-bit kernel developed over four labs on the course’s YoctOS skeleton, which I branded SealOS: display, paging, interrupts, keyboard and timer, then user tasks and system calls. Booted again in QEMU for this site.',
    institution: 'HEPIA', course: 'Advanced Systems Programming',
    period: 'Sep – Dec 2022', date: '2022-12', team: 'Solo',
    domains: ['Systems & Embedded'],
    tech: ['C', 'x86 assembly (NASM)', 'GRUB multiboot', 'QEMU', 'Make'],
    description: [
      'The course provided an educational kernel, YoctOS, as a skeleton for each lab, and each lab asked for the missing pieces: the graphics driver, frame allocator and page tables, interrupt handling with the timer and keyboard drivers, task management, system calls and the user library are my work.',
      'The first lab asked for a welcome message and a logo of our choice, so I made the system my own: SealOS, with its own boot entry, a seal logo loaded as a GRUB module and drawn by my driver, and a welcome text that the kernel can print in upper or lower case. From the second lab on, each lab started from a fresh skeleton under the course’s name, so the later screens say YoctOS.'
    ],
    parts: [
      { title: 'Display (SealOS)', text: 'Pixels and text on the VBE framebuffer, GRUB modules and system information, with the SealOS logo and welcome screen.' },
      { title: 'Paging', text: 'Frame allocator and page tables, identity mappings for RAM and the framebuffer.' },
      { title: 'Interrupts', text: 'IDT and PIC set-up, exception handlers, a 1000 Hz timer and a keyboard driver with shift/ctrl/alt and the Swiss-French layout.' },
      { title: 'Tasks & system calls', text: 'User tasks loaded from GRUB modules, each with its own TSS, GDT entry, page directory and address space; system calls and a small user library, so that the course’s shell and my test programs (a task that triggers a page fault, a system-call timing program) run in user mode, and faulty tasks are killed.' }
    ]
  },
  {
    id: 'arm-processor-labs',
    level: 'bsc', kind: 'Lab series',
    title: 'ARM Cortex-M3 assembly, DMA and MPU',
    summary: 'Thumb-2 assembly called from C, DMA-driven LEDs and SD-card/LCD transfers, and memory protection on an LPC1769.',
    institution: 'HEPIA', course: 'Processors',
    period: 'Oct 2021 – Jan 2022', date: '2022-01', team: 'Pair (with Damian Boquete)',
    domains: ['Systems & Embedded'],
    tech: ['ARM Thumb-2 assembly', 'C', 'LPC1769', 'DMA', 'MPU', 'MCUXpresso'],
    parts: [
      { title: 'Assembly', text: 'String handling, memory access, subroutines and the stack, recursion, overflow detection.' },
      { title: 'DMA', text: 'Memory-to-peripheral transfers to drive RGB LEDs and to stream an SD card to an LCD.' },
      { title: 'MPU', text: 'Memory regions and fault handling with the Cortex-M3 memory protection unit.' }
    ]
  },
  {
    id: 'ocr-digits',
    level: 'bsc', kind: 'Project',
    title: 'Handwritten digit recognition web app',
    summary: 'Draw a digit in the browser, label it to train the network, or let the model read it. Front end re-run for this site.',
    institution: 'HEPIA', course: 'Digital Image Processing',
    period: 'Jun 2022', date: '2022-06', team: 'Pair (with Fabian Troller)',
    domains: ['Machine Learning', 'Vision & Graphics', 'Software & Web'],
    tech: ['JavaScript (canvas)', 'Python', 'FastAPI', 'Keras / TensorFlow', 'Model serving & retraining'],
    description: ['A 20 × 20 HTML5 canvas sends the drawing to a FastAPI back end: /train stores it as a labelled sample and retrains a small dense network, /test returns the probability of each digit, drawn as a bar chart. We collected 703 samples by hand this way. It is a small MLOps loop: the model is served behind an API and retrained as new labelled samples arrive from the app.']
  },
  {
    id: 'blockchain-pow',
    level: 'bsc', kind: 'Lab',
    title: 'A proof-of-work blockchain in Python',
    summary: 'Files chained by their SHA-256 hashes, each block mined until its hash starts with 13 zero bits. Re-run for this site.',
    institution: 'HEPIA', course: 'Telecommunications',
    period: 'May 2021', date: '2021-05', team: 'Solo',
    domains: ['Security', 'Algorithms & Math'],
    tech: ['Python', 'hashlib (SHA-256)'],
    description: ['Each block stores its index, the hash of the previous block and the data of one file, followed by a nonce that is incremented until the block’s hash falls below the difficulty target.']
  },
  {
    id: 'quiz-battle',
    level: 'bsc', kind: 'Project',
    title: 'Quiz Battle: a real-time multiplayer quiz backend',
    summary: 'A TypeScript API where three players log in with JWTs and compete live over WebSockets.',
    institution: 'HEPIA', course: 'Web Applications & Architecture',
    period: 'May – Jun 2022', date: '2022-06', team: 'Solo',
    domains: ['Software & Web', 'Cloud & Distributed'],
    tech: ['TypeScript', 'Node.js / Express', 'Socket.IO', 'JWT (RSA keys)', 'SQLite', 'Winston / Morgan', 'Node cluster'],
    description: ['REST routes for users and questions protected by a JWT middleware, a Socket.IO game server that draws ten random questions and scores answers live, structured logging, and a cluster manager that spreads the server over CPU cores. Documented API with Postman collections.']
  },
  {
    id: 'cv-website-2022',
    level: 'bsc', kind: 'Project',
    title: 'The first version of this website',
    summary: 'My 2022 CV website: hand-drawn mock-ups, responsive HTML/CSS/JS, a carousel and pop-ups fed by a Strapi API.',
    institution: 'HEPIA', course: 'Web Applications & Architecture',
    period: 'Feb – May 2022', date: '2022-05', team: 'Solo',
    domains: ['Software & Web'],
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Strapi', 'Claude Code (2026 rebuild)'],
    description: [
      'Designed on paper first (desktop and mobile), then built by hand: animated navigation, an education carousel with touch support, tilt cards, and pop-ups whose content came from a local Strapi headless CMS.',
      'The site you are reading is the same repository, rebuilt in 2026 as a data-driven portfolio. The rebuild was made possible by an AI assistant, Claude Code: working from my archives and under my direction, it collected and re-ran my old projects, wrote most of the new code and drafted the texts, which I reviewed and corrected card by card.'
    ]
  },
  {
    id: 'solar-robot-architecture',
    level: 'bsc', kind: 'Project',
    title: 'Solar-powered light-following robot',
    summary: 'Computer-architecture mini-project: extending the course’s RISC processor in Logisim to drive a solar-powered robot that follows light.',
    institution: 'HEPIA', course: 'Computer Architecture',
    period: 'May – Jun 2021', date: '2021-06', team: 'Pair (with Alexandre Benzonana)',
    domains: ['Systems & Embedded'],
    tech: ['Logisim', 'HEPIA RISC CPU', 'Assembly', 'FPGA', 'PWM', 'Light sensors'],
    description: ['We built the processor up week by week (register file, ALU, memory, function calls, peripherals) and added PWM motor control and light-sensor inputs. The program compares the sensors and steers towards the brightest direction; a solar panel charges the battery. The same logic was first validated in simulation.']
  },
  {
    id: 'embedded-mylab2',
    level: 'bsc', kind: 'Lab series',
    title: 'Embedded C on an ARM Cortex-M3',
    summary: 'Microcontroller labs on the LPC1769 MyLab2 board (timers, PWM, interrupts, LCD, accelerometer), then a small robot driven by a state machine.',
    institution: 'HEPIA', course: 'Microcontroller Programming',
    period: 'Sep 2020 – Jun 2021', date: '2021-06', team: 'Solo',
    domains: ['Systems & Embedded'],
    tech: ['C', 'LPC1769', 'MCUXpresso', 'I²C / SPI', 'PWM'],
    description: ['Fifteen labs on the MyLab2 board, then the end-of-year mini-project: on the course’s robot and its driver library, a timer interrupt reads the distance, line and motion sensors and the odometers, and my state machine runs the course: it finds the wall ahead, turns to keep it on its right and follows it at a set distance, rounds three corners, drives 10 cm, turns 45°, drives 15 cm, counts the black bands it crosses and ends with a full turn on one wheel; a gesture over the sensors stops it or starts it again. The assembly labs of the Processors course have their own page.']
  },
  {
    id: 'telecom-compression-cipher',
    level: 'bsc', kind: 'Lab series',
    title: 'Huffman compression and a one-time pad in Python',
    summary: 'Building the Huffman tree to compress text, then XOR encryption of a file with a random key as long as the message.',
    institution: 'HEPIA', course: 'Telecommunications',
    period: 'Nov 2020 – Mar 2021', date: '2021-03', team: 'Pair (with Darius Briquet)',
    domains: ['Algorithms & Math', 'Security'],
    tech: ['Python'],
    parts: [
      { title: 'Huffman', text: 'Symbol frequencies, the Huffman tree and code table, entropy and compression ratio.' },
      { title: 'One-time pad', text: 'The text converted to bits, a random key of the same length saved as key.bin, XOR encryption to crypted.bin and decryption back.' }
    ]
  },
  {
    id: 'telecom-networking',
    level: 'bsc', kind: 'Lab series',
    title: 'ZigBee measurements and network labs',
    summary: 'Channel occupancy and throughput on the 2.4 GHz band, plus Wireshark, DNS, FTP and VLAN labs.',
    institution: 'HEPIA', course: 'Telecommunications · Network Fundamentals',
    period: 'Oct 2020 – Jun 2021', date: '2021-06', team: 'Groups of 2–3',
    domains: ['Cloud & Distributed', 'Signal Processing'],
    tech: ['ZigBee', 'Spectrum analyser', 'Wireshark', 'Cisco Packet Tracer'],
    parts: [
      { title: 'ZigBee', text: 'The 2.4 GHz spectrum and a ZigBee network’s throughput measured in the lab (with Nikola Antonijevic and Damian Boquete).' },
      { title: 'Networks', text: 'Ethernet and ARP with Wireshark, traceroute and DNS, FTP/TFTP, VLANs.' }
    ]
  },
  {
    id: 'iot-pycom-summer-school',
    level: 'bsc', kind: 'Project',
    title: 'IoT summer school: motorcycle waypoint tracker',
    summary: 'Pycom boards communicating over Bluetooth LE to log a motorbike passing waypoints.',
    institution: 'HEPIA', course: 'Summer school 2021',
    period: 'Jul 2021', date: '2021-07', team: 'Small team',
    domains: ['Systems & Embedded'],
    tech: ['MicroPython', 'Pycom (Pysense)', 'Bluetooth LE'],
    description: ['A board on the bike scans for waypoint boards, connects, timestamps the passage and moves on, so the route can be reconstructed. Designed in pseudocode first, then prototyped with BLE advertisement and scanning.']
  },
  {
    id: 'hepia-simulator-summer-school',
    level: 'bsc', kind: 'Project',
    title: 'HEPIA Simulator: mobile mini-games',
    summary: 'Summer-school game in Flutter and Flame: three competitive mini-games set around the school. I built the Tron-like one.',
    institution: 'HEPIA', course: 'Summer school 2022',
    period: 'Aug – Sep 2022', date: '2022-09', team: 'Team of 4 (Stefano Cirieco, Lucas, Vincent)',
    domains: ['Mobile & Games'],
    tech: ['Dart', 'Flutter', 'Flame', 'Figma'],
    description: ['The player has to reach class, find the exam answers and rescue a missing teacher. My mini-game, “Survive the traffic”, is a Tron-like race on a map of the streets around HEPIA: vehicles leave trails, collisions are detected by Flame’s collision system, and the last one standing wins.']
  },
  {
    id: 'tech-society-presentations',
    level: 'bsc', kind: 'Coursework',
    title: 'Technology and society presentations',
    summary: 'Researched talks on Cambridge Analytica, anonymity online and video-game platforms, and a video essay on ageism towards young gamers.',
    institution: 'HEPIA', course: 'History & Society of Computing',
    period: 'Dec 2020 – Apr 2022', date: '2022-04', team: 'Groups of 2–3',
    domains: ['Communication', 'Security'],
    tech: ['Research', 'Public speaking'],
    description: ['Sourced presentations with bibliographies on the Cambridge Analytica scandal and data-driven political targeting, the problems of anonymity online, and the PC video-game distribution platforms (market structure, business models, design and marketing). In 2022 our group made a five-minute video essay on ageist discourse aimed at young gamers, built on research and two interviews; the interviewees appear only as anonymous call avatars.']
  },
  {
    id: 'saferide',
    level: 'bsc', kind: 'Project',
    title: 'SafeRide: a business plan for a ride-hailing start-up',
    summary: 'A business course project: a ride service for Geneva where drivers and passengers are all women, set up as a company and pitched as to investors.',
    institution: 'HEPIA', course: 'Project Management',
    period: 'Oct 2022 – Jan 2023', date: '2023-01', team: 'Group of 6 (my role: CEO and founder)',
    domains: ['Communication'],
    tech: ['Business plan', 'Market analysis', 'Risk analysis & SWOT', 'Financial forecast', 'Pitching'],
    description: [
      'The idea: an app in the spirit of Uber where both the drivers and the passengers are women, for passengers who are afraid of being driven by a stranger at night, and to create driving jobs for women while pushing back on stereotypes about women at the wheel. The goal was not to build the app, of which we only made a placeholder, but to set up the company around it.',
      'Our business plan defines the need, the target customers and the offer; maps the market (taxis, Uber, Heetch, public transport) in a competitor matrix; prices a ride with a formula derived from Uber fares (minutes plus three times the kilometres, halved, plus a demand surcharge); rates each risk by likelihood with a mitigation; and ends with a SWOT matrix, a start-up budget and a three-year cash-flow forecast. As CEO I presented it in a short pitch to the class, playing the investors.',
      'We also shot a short scenario film; it shows my classmates, so it is not published here.'
    ]
  },

  /* ============================================================ Personal */
  {
    id: 'stock-prediction',
    level: 'personal', kind: 'Personal',
    title: 'Stock price prediction experiments',
    summary: 'Early self-taught ML in 2020: LSTM, SVR, decision trees and linear regression on stock prices.',
    institution: 'Personal · related to my work at COSMICS', course: 'Self-study',
    period: 'May 2020', date: '2020-05', team: 'Solo',
    domains: ['Machine Learning'],
    tech: ['Python', 'Keras (LSTM)', 'scikit-learn', 'pandas', 'Google Colab'],
    description: [
      'Self-study research for my R&D internship at COSMICS: three notebooks that start from YouTube tutorials and then extend them, an LSTM on Apple prices, support-vector and linear regression on Facebook, and decision-tree vs linear regression on Netflix. The plan was a tool where you pick a stock and a method and get a chart. I later developed these ideas further and applied them to other cases at COSMICS; that work stays private.',
      'Looking back with a master’s in ML: the tree model “predicts” the last 25 days so well because those days leak into its training data. Exactly the kind of evaluation mistake my thesis was careful to avoid.'
    ]
  },
  {
    id: 'text-intelligence-prediction',
    level: 'personal', kind: 'Personal',
    title: 'Predicting cognitive scores from written text',
    summary: 'A 2023 data challenge with a friend: predicting a participant’s cognitive-ability score from a short text and survey answers.',
    institution: 'Personal project', course: 'Data challenge',
    period: 'May 2023', date: '2023-05', team: 'Pair (with a friend who provided the data)',
    domains: ['Machine Learning'],
    tech: ['Python', 'scikit-learn', 'pandas', 'spaCy', 'gensim'],
    description: ['Feature engineering on the survey answers (one-hot encoding, min-max scaling), TF-IDF features from each participant’s text, a logistic-regression baseline on a two-level train/validation split, and an evaluation helper (cross-validation, precision, recall, F1, confusion matrix). The dataset is not mine to share, so only my code is shown.']
  },
  {
    id: 'medical-questionnaire-app',
    level: 'personal', kind: 'Personal',
    title: 'Medical questionnaire desktop app',
    summary: 'A desktop app that renders questionnaires from JSON, saves the answers and e-mails them.',
    institution: 'Personal project', course: '',
    period: 'Oct – Nov 2023', date: '2023-11', team: 'Solo',
    domains: ['Medical AI', 'Software & Web'],
    tech: ['Python', 'CustomTkinter', 'JSON', 'SMTP'],
    description: ['Questionnaires (text, choice and multi-choice questions) are plain JSON files; the app lists them, marks completed ones, lets the user edit answers, exports everything to JSON and can send it by e-mail through common providers. Rewritten from Tkinter to CustomTkinter for a modern look.']
  },
  {
    id: 'the-app-flutter',
    level: 'personal', kind: 'Personal',
    title: 'Location-based mobile app prototype',
    summary: 'A Flutter app idea kept private: architecture research (auth, geolocation, maps, payments) and the project scaffolding.',
    institution: 'Personal project', course: '',
    period: 'Sep 2023', date: '2023-09', team: 'Solo',
    domains: ['Mobile & Games'],
    tech: ['Dart', 'Flutter', 'Architecture research'],
    description: ['The idea stays private, but the groundwork is visible: a comparison of authentication options (Firebase, JWT, Google OAuth), geolocation and maps packages, storage options and payment methods, and the app scaffolded on Flutter’s skeleton template with one controller/service/view module per planned screen (welcome, home, messages, tags, account). The screens themselves were not implemented yet.']
  },
  {
    id: 'skybreak',
    level: 'personal', kind: 'Personal',
    title: 'Skybreak: an action-RPG prototype in Rust and Bevy',
    summary: 'An early prototype of a 2.5D multiplayer fantasy RPG: pixel-art characters in a toon-shaded 3D world, built with AI pair-programming.',
    institution: 'Personal project', course: 'Game development',
    period: 'Mar – Apr 2026', date: '2026-04', team: 'Solo',
    domains: ['Mobile & Games', 'Vision & Graphics'],
    tech: ['Rust', 'Bevy 0.18 (ECS)', 'WGSL shaders', 'RON data files', 'Claude Code', 'PixelLab (AI art)'],
    description: [
      'A side project during my thesis, still at the early-prototype stage: the design is a floating hub city, co-op roguelike runs below it and team PvP, all with one persistent character. The prototype has 19 Bevy plugins (combat with hitboxes, poise and stagger, skills, items, relics, enemies and bosses, hub, PvP, progression), a 320 × 180 render-to-texture pixelation pipeline, billboarded sprites and a custom toon shader. Content (classes, enemies, bosses, biomes, relics) lives in RON data files with templates.',
      'It is also an experiment in working with AI tools: the code was written with Claude Code from design documents I maintained (game design, architecture, art direction, a 13-point style checklist), and the character sprites are generated with PixelLab and checked against that guide. The art on this page is AI-generated.'
    ]
  },
  {
    id: 'discord-bot',
    level: 'personal', kind: 'Personal',
    title: 'My first Discord bot',
    summary: 'A Python bot I wrote as a teenager: live Bitcoin price and dice rolling for tabletop games. My earliest project still in my archives.',
    institution: 'Personal project · TechSpark Academy student', course: 'Self-taught',
    period: 'Jul 2018', date: '2018-07', team: 'Solo',
    domains: ['Software & Web'],
    tech: ['Python', 'discord.py', 'asyncio', 'Bitfinex API'],
    description: [
      'I built it the summer I was a student at TechSpark Academy, before becoming an assistant instructor and then a teacher there. Commands answer in the chat: the current Bitcoin price fetched from the Bitfinex API, dice rolls in NdM notation (“<roll 3d6”) with each die and the total, input checks and a cap on the number of dice, and quick d10 and d100 rolls.',
      'The code shown here is cleaned for publication: the bot token is read from the environment, and the joke commands I wrote back then are removed.'
    ]
  }
];
