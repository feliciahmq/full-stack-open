CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes INTEGER DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('author1', 'url1', 'title1', 1);
insert into blogs (author, url, title, likes) values ('author2', 'url2', 'title2', 2);

