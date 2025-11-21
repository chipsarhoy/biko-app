# Version History

## [1.0.3] 2025-11-21

### Added
- Subtotal price projected display
- Registering a new account

### Updated
- Significantly refactored most project files/code into organized files and thus better adhering to separation of concerns
- Selecting menu items by quantity for better dynamic selection instead of single-clicking buttons

## [1.0.2] 2025-10-15

### Added
- Full-stack order submission flow
- Refresh token endpoint implemented when access token expires
- Serializer combined to handle related data into respective tables

### Updated
- Logout function transferred from component to a separate JavaScript file to accommodate unauthorized post requests

## [1.0.1] 2025-09-06

### Added
- Quantity selection for menu items per item
- Customer information form to be submitted alongside the order
- Logout feature implemented via Component

### Updated
- JWT to be securely stored in http-only cookies

## [1.0.0] 2025-08-11

### Added
- Authentication using JWTs
- Getting menu information from the server to display
- Models for expected data e.g. (Customer, Order, Menu, OrderItems)
- Serializers for expected models
