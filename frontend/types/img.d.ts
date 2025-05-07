declare module "*.svg" {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.jpg' {
  const value: string;
  export default value;
}

// src/types/image.d.ts
declare module "*.svg?url" {
  const content: string;
  export default content;
}

declare module "*.png?url" {
  const content: string;
  export default content;
}

declare module "*.jpg?url" {
  const content: string;
  export default content;
}

declare module "*.webp?url" {
  const content: string;
  export default content;
}
