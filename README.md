# My Blog App

This is a blog app built using Hashnode as the backend. It allows you to display all your blogs from Hashnode and view each blog in a separate slug page.

## Features

- Display all blogs from Hashnode
- View each blog in a separate slug page

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ladparth/navigatedata.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure Hashnode API

   - Add the following lines to your `.env.local` file in the root directory of your project:

     ```bash
     NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT=https://gql.hashnode.com
     NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST=
     ```

## Usage

To start the development server, run the following command:
