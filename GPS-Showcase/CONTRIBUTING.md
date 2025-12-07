# Contributing to GPS-Showcase

First off, thank you for considering contributing to GPS-Showcase! It's people like you that make GPS-Showcase such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS, Windows, macOS]
 - Browser: [e.g. chrome, safari]
 - Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request**

**Pull Request Template:**
```markdown
**Description**
Brief description of what this PR does.

**Type of Change**
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

**Testing**
- [ ] I have tested this code locally
- [ ] I have tested on multiple browsers
- [ ] I have tested on mobile devices
- [ ] All existing tests pass

**Checklist**
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

## Development Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE
- Git
- Basic knowledge of HTML, CSS, and JavaScript

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/GPS-Showcase.git
   cd GPS-Showcase
   ```

2. **Start a local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## Coding Standards

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Maintain consistent indentation (2 spaces)
- Add comments for complex sections

### CSS
- Follow BEM naming convention where applicable
- Use CSS custom properties (variables) for colors and common values
- Maintain mobile-first responsive design
- Group related styles together
- Add comments for complex selectors

### JavaScript
- Use ES6+ features
- Follow camelCase naming convention
- Add JSDoc comments for functions
- Handle errors gracefully
- Sanitize all user inputs
- Use meaningful variable names

**Example:**
```javascript
/**
 * Validates email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
```

### Accessibility
- All interactive elements must be keyboard accessible
- Include proper ARIA labels
- Maintain color contrast ratios (WCAG 2.1 AA)
- Test with screen readers
- Provide text alternatives for images

### Performance
- Minimize DOM manipulations
- Use event delegation where appropriate
- Optimize images and assets
- Avoid blocking operations
- Use CSS transitions over JavaScript animations

## Git Commit Messages

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (white-space, formatting)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding missing tests
- **chore**: Changes to build process or auxiliary tools

### Examples
```
feat(questionnaire): Add progress indicator to questionnaire

Added a visual progress bar that shows users how many questions
they have completed and how many remain.

Closes #123
```

```
fix(validation): Resolve email validation regex issue

The previous regex was not properly validating email addresses
with multiple dots in the domain. Updated to handle edge cases.

Fixes #456
```

## Branch Naming

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical production fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

**Examples:**
- `feature/add-map-integration`
- `bugfix/fix-form-validation`
- `docs/update-readme`

## Testing Guidelines

### Manual Testing Checklist
- [ ] Test on Chrome, Firefox, Safari, and Edge
- [ ] Test on mobile devices (iOS and Android)
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify responsive design at different breakpoints
- [ ] Check browser console for errors
- [ ] Test form validation
- [ ] Verify data persistence

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Mobile (last 2 versions)

## Documentation

### Code Comments
- Comment complex logic
- Explain "why" not "what"
- Keep comments up to date
- Use JSDoc for functions

### README Updates
- Update README.md when adding features
- Include screenshots for UI changes
- Update installation instructions if needed
- Keep feature list current

## Review Process

### What We Look For
1. **Code Quality**
   - Clean, readable code
   - Follows project conventions
   - Proper error handling
   - No console.log statements

2. **Functionality**
   - Works as intended
   - No breaking changes
   - Handles edge cases
   - Proper validation

3. **Testing**
   - Thoroughly tested
   - No new bugs introduced
   - Cross-browser compatible
   - Mobile responsive

4. **Documentation**
   - Code is well-commented
   - README updated if needed
   - Clear commit messages

### Review Timeline
- Initial review within 48 hours
- Follow-up reviews within 24 hours
- Merge after approval from maintainer

## Community

### Getting Help
- Check existing documentation
- Search closed issues
- Ask in GitHub Discussions
- Contact maintainers

### Communication Channels
- GitHub Issues - Bug reports and feature requests
- GitHub Discussions - General questions and discussions
- Pull Requests - Code contributions

## Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Project documentation

## License

By contributing to GPS-Showcase, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

Don't hesitate to ask questions! We're here to help. Open an issue or start a discussion.

Thank you for contributing to GPS-Showcase! 🚀

---

**Project Director:** James Gordon Watkins  
**Maintainers:** [List of maintainers]  
**Last Updated:** December 6, 2024