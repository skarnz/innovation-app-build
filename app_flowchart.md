flowchart TD
    A[Dashboard Layout]
    B[Navigation and UI]
    C[State Persistence]
    D[AiAgent Persistent UI]
    E[File Management System (FS)]

    A --> B
    A --> C
    A --> D
    A --> E

    %% Project Phases
    F[Project Setup  \n ProductTypeSelector] 
    G[Ideate Phase  \n Idea Capture and Counter Intuition]
    H[Validate Phase]
    I[Business Model and Value Chain]
    J[MVP Specification]
    K[Prototyping]
    L[Marketing]

    A --> F
    A --> G
    A --> H
    A --> I
    A --> J
    A --> K
    A --> L

    %% Validate Phase Details
    H1[Data Partner Integration  \n (Pollfish, Prolific, etc)]
    H2[Survey Management]
    H3[Results Analysis]
    H4[Deep Research]
    H5[Supporting Routes  \n Score, Forecasting, Target, Interview]

    H --> H1
    H --> H2
    H --> H3
    H --> H4
    H --> H5

    %% Business Model and Value Chain Details
    I1[BMC  \n Interactive Canvas]
    I2[Value Chain Analysis]
    I3[Competition and Market Analysis]
    I4[Strategic Tools  \n Outcomes and Anti Intuition]

    I --> I1
    I --> I2
    I --> I3
    I --> I4

    %% MVP Specification Details
    J1[Core Features  \n Wizard with AI Guidance]
    J2[Timeline Planning  \n Gantt/List View]
    J3[Resource Allocation]
    J4[Dependency Mapping]

    J --> J1
    J --> J2
    J --> J3
    J --> J4

    %% Prototyping Details
    K1[User Experience Definition  \n Style Cards]
    K2[Sketch and Basic Prototype]
    K3[Software Specific  \n UI UX Wireframes and Architecture Diagram]
    K4[Service Specific  \n Blueprint and Operational Flow]
    K5[Physical Product Specific  \n 3D Modeling Interface]

    K --> K1
    K --> K2
    K --> K3
    K --> K4
    K --> K5

    %% Marketing Details
    L1[Marketing Timeline and Platforms]
    L2[Automation Flow  \n Visual Workflow Builder]
    L3[Generative Video  \n API Integration]

    L --> L1
    L --> L2
    L --> L3

    %% FS Integrations
    E --> E1[GitHub Integration  \n OAuth and Folder Sync]
    E --> E2[Google Docs Integration  \n OAuth and Linking]

    %% Connections between persistent components and phases
    D -->|Guides Core Features| J1
    C -->|Saves key choices| F
    L3 -->|Saves video to| E