CREATE TABLE products (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url_image TEXT NOT NULL,
  description TEXT NOT NULL,
  price JSON,
  differences JSON,
  note_client DOUBLE,
  apper_start BOOLEAN,
  hero_product BOOLEAN,
  categoryId CHAR(36) NOT NULL,
  CONSTRAINT `fk_category_id` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SELECT * FROM `products`;

DESC categories;
