This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Dev:
## Getting Started

To push prisma models
```bash
npx prisma db push
```
To run prisma client:
```bash
npx prisma generate
```
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




# Users:

## Clone The Project In A Directory

```bash
git clone https://github.com/hussainabbas2000/Bliss-Bazaar.git
```

## Go To Root Of The Project And Do The Following:

#### Note: There is no .env file for security purposes. Ask the developer on how to include it in the project

### Installing Dependencies
```bash
npm install
```
### Generate Prisma Client
```bash
npx prisma generate
```

### Running the Application
```bash
npx run dev
```
### The App runs on localhost:3000

## Running the Tests:
### Note: Try to run mutant testing file in a seperate execution run (Take it out of the directory for the first test execution run to achieve 100% coverage)


### Installing Dependencies
```bash
npm install
```

### In a New Terminal at the Root:
```bash
npm test
```

