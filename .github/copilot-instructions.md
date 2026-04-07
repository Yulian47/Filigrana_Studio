# Copilot Instructions - Filigrana Studio

This document provides workspace-specific custom instructions for Copilot.

## Project Overview

**Filigrana Studio** is a modern landing page website for a design studio built with HTML, CSS, JavaScript, and SCSS.

### Project Details

- **Type:** Web Landing Page
- **Tech Stack:** HTML5, CSS3, SCSS, JavaScript (ES6+)
- **Purpose:** Create an engaging landing page for a design studio
- **Current Status:** Fully scaffolded and ready for development

### Key Features

- Fully responsive design (mobile-first approach)
- Modern styling with animations
- Smooth scrolling navigation
- Contact form with validation
- Portfolio showcase section
- Services display
- SEO-friendly structure

## File Structure

```
filigrana studio/
├── index.html              # Main HTML file
├── css/styles.css          # Compiled CSS stylesheet
├── scss/styles.scss        # SCSS source file
├── js/script.js            # JavaScript functionality
├── assets/                 # Images and media folder
├── README.md               # Project documentation
└── .github/
    └── copilot-instructions.md  # This file
```

## Development Guidelines

### Working with HTML

- Keep HTML semantic and clean
- Use proper heading hierarchy (h1, h2, h3, etc.)
- Ensure all links have proper descriptions
- Test accessibility with screen readers

### Working with CSS/SCSS

- Primary color: `#6c5ce7` (purple)
- Secondary color: `#a29bfe` (light purple)
- Text color: `#2d3436` (dark gray)
- Maintain mobile-first approach
- Use CSS Grid and Flexbox for layouts

### Working with JavaScript

- Keep code modular and well-commented
- Use modern ES6+ syntax
- Implement proper error handling
- Test all interactive features across browsers
- Avoid external dependencies where possible

## Common Tasks

### Compiling SCSS

```bash
sass scss/styles.scss css/styles.css
sass --watch scss:css
```

### Running Local Server

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server
```

### Testing Responsiveness

- Test on mobile (320px)
- Test on tablet (768px)
- Test on desktop (1024px+)
- Use Chrome DevTools for responsive testing

## Color Scheme

- Primary: `#6c5ce7` (Purple)
- Secondary: `#a29bfe` (Light Purple)
- Text: `#2d3436` (Dark Gray)
- Background: `#f5f5f5` (Light Gray)
- White: `#ffffff`

## Future Enhancements

- [ ] Add contact form backend processing
- [ ] Integrate newsletter signup
- [ ] Add testimonials section
- [ ] Implement blog section
- [ ] Add team member profiles
- [ ] Setup analytics tracking
- [ ] Implement CMS integration

## Best Practices

1. Always test changes in multiple browsers
2. Keep accessibility in mind (WCAG guidelines)
3. Optimize images before adding to the project
4. Use semantic HTML elements
5. Maintain clean and organized code
6. Document any custom functions
7. Test form submissions and validations
8. Ensure all links are working

## Troubleshooting

### Styles not applying

- Check that CSS link is correct in HTML
- Clear browser cache (Ctrl+Shift+Delete)
- Recompile SCSS if you made changes there

### JavaScript not working

- Check browser console for errors (F12)
- Verify script src is correct in HTML
- Test in different browsers
- Check for JavaScript syntax errors

### Responsive layout issues

- Use DevTools mobile emulation
- Test on actual devices
- Check media query breakpoints
- Verify flexbox/grid properties

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)

---

Last Updated: April 1, 2026
