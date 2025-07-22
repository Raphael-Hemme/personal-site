# Agent Instructions for Personal Site Repository

This document provides guidance for AI agents working on this codebase.

## Project Overview

This is a personal portfolio and blog website built with Angular. The main features include a blog, a portfolio of creative coding projects (the "IO Garden"), and standard pages like "About" and "Legal Notice".

## Repository Structure

The project follows a standard Angular CLI structure. Key directories and their purposes are outlined below:

-   **`src/app/core`**: Contains the core features and pages of the application. Each page (e.g., `home`, `blog`, `about`) has its own module and component.
-   **`src/app/shared`**: Contains reusable components, services, and UI elements that are used across multiple features.
    -   `src/app/shared/components`: Dumb components that receive data and emit events.
    -   `src/app/shared/services`: Application-wide services (e.g., `DataService`, `WindowSizeService`).
    -   `src/app/shared/ui-components`: "Smart" UI components that often have their own logic and state.
-   **`src/app/routing`**: Defines the application's routing configuration.
    -   `app-root-routes.ts`: Defines the main application routes.
-   **`src/assets`**: Contains all static assets for the application.
    -   `src/assets/blog-posts`: Markdown files for individual blog posts.
    -   `src/assets/blog-posts-meta-data.json`: Metadata for all blog posts, including title, date, tags, and preview image.
    -   `src/assets/io-garden-experiment-meta-data.json`: Metadata for the creative coding ("IO Garden") experiments.
    -   `src/assets/io-garden-experiment-descriptions`: Markdown files containing the detailed descriptions for each IO Garden experiment.
    -   `src/assets/images`: Contains all images, organized by type (e.g., `blog-preview-images`, `own-logo`).
    -   `src/assets/stylesheets`: Global SCSS partials for variables, colors, typography, etc.
-   **`src/styles.scss`**: The global stylesheet that imports the partials from `src/assets/stylesheets`.

## Development Workflow

### Adding a New Blog Post

1.  Create a new markdown file in `src/assets/blog-posts/`. Use the naming convention `bp-YYYY-MM-DD-a.md`.
2.  Add a corresponding entry to the `src/assets/blog-posts-meta-data.json` array. Include metadata such as `id`, `title`, `publicationDate`, `tags`, and `previewImage`.

### Adding a New IO Garden Experiment

1.  Add a metadata entry to the `src/assets/io-garden-experiment-meta-data.json` array.
2.  Create a corresponding markdown description file in `src/assets/io-garden-experiment-descriptions/`.
3.  Add a preview image to `src/assets/images/io-garden-preview-images/`.
4.  The experiment's component logic should be implemented within the `src/app/core/io-garden/components/` directory.

### Creating New Components

-   Follow the existing structure. If a component is a reusable, presentational ("dumb") component, place it in `src/app/shared/components`.
-   If a component is a "smart" component with its own logic and state, consider if it belongs in `src/app/shared/ui-components` or as part of a specific feature in `src/app/core`.
-   Ensure components are properly declared in their respective modules.

## Tooling and Commands

This project uses the Angular CLI for managing development tasks. The following commands are available:

-   **`npm start`**: Runs the development server.
-   **`npm run build`**: Builds the application for production.
-   **`npm test`**: Runs the unit tests using Karma and Jasmine.

There is no explicit linter configuration, but the project adheres to the settings in `.editorconfig`.

## Coding Conventions & Style

-   **Language**: Use TypeScript for logic and SCSS for styles.
-   **Formatting**: Adhere to the formatting defined in `.editorconfig`.
-   **Naming**: Follow Angular's style guide for file and component naming (e.g., `feature-name.component.ts`).
-   **Styling**: Utilize the SCSS variables and mixins defined in `src/assets/stylesheets/` for consistency in colors, typography, and spacing. Avoid hard-coding style values directly in component stylesheets.
-   **Services**: Provide services at the root level unless they are specific to a feature module.
