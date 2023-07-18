<h1> Movie-Quotes Front-end </h1>

### Table of Contents

* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)

#

### Prerequisites

* *Node JS @12.X and up*
* *npm @6 and up*

#

### Tech Stack

* Vue3 - front-end framework
* Pinia - State management tool
* Axios - HTTP request helper
* TailwindCss - css Styling
* Vee-validate - form validation
* Pusher and Laravel Echo - Broadcasting events

### Getting Started

1. First of all you need to clone Movie-quotes-front repository from github:

```sh
git clone https://github.com/RedberryInternship/giorgi-tarkhnishvili-movie-quotes-front.git
```

2. Next step requires install all the dependencies.

```sh
npm install
```

3. Now we need to set our env file. Go to the root of your project and execute this command.

```sh
cp .env.example .env
```

And now you should provide .env file all the necessary environment variables:

>VITE_PUSHER_APP_KEY=[YOUR PUSHER KEY];
>
>VITE_PUSHER_APP_CLUSTER=[YOUR PUSHER CLUSTER]
> 
>VITE_API_BASE_URL=[YOUR API BASE URL] *example http://localhost:8000/api*

4. after that you can run e-space application from terminal:

```sh
npm run dev
```

### Project Structure

```bash
├─── node_modules      # external packages
├─── public      # public directories
├─── src      # project source codes
│   ├─── assets       # project images and fonts
│   ├─── components   # reusable components
│   ├─── config    # package config
│   ├─── helpers    # additional packages
│   ├─── services    # backend configuration
│   ├─── router    # project router
│   ├─── views    # router components
│   ├─── stores    # state management
```