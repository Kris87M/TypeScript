{
  const selectorArticle: string =  '.post';
  const selectorTitle: string = '.post-title';
  const selectorTitleList: string = '.titles';
  const selectorArticleTags: string = '.post-tags .list';
  const selectorArticleAuthor: string = '.post-author';
  const selectorAuthorsList: string = '.list.authors';
  const selectorTagsList: string = '.sidebar .tags';

  const titleClickHandler = function (this: HTMLLinkElement, event: Event): void {
    event.preventDefault();
    const clickedElement = this;

    /* find active link and make it inactive */
    const activeLink = document.querySelector('.titles a.active') as HTMLLinkElement;
    if(activeLink) activeLink.classList.remove('active');

    /* add active class to clicked link */
    clickedElement.classList.add('active');

    /* find and hide active article */
    const activeArticle = document.querySelector('.posts article.active') as HTMLElement;
    if(activeArticle) activeArticle.classList.remove('active');

    /* find id of article related to clicked link, then find it and show */
    const hrefAttribute = clickedElement.getAttribute('href') as string;
    const targetArticle = document.querySelector(hrefAttribute) as HTMLElement;
    if(targetArticle) targetArticle.classList.add('active');
  };

  const generateTitleLinks = (customSelector: string = ''): void => {

    /* find and empty title list */
    const titleList = document.querySelector(selectorTitleList) as HTMLUListElement;
    titleList.innerHTML = '';

    /* prepare variable for storing all the title links */
    let html: string = '';

    /* find all articles and loop through each of them */
    const articles = document.querySelectorAll(selectorArticle + customSelector) as NodeListOf<HTMLElement>;
    for (let article of articles) {

      /* find id of the article */
      const articleID = article.getAttribute('id') as string;

      /* find elem that holds the title and retrieve it */
      const articleTitle = article.querySelector(selectorTitle)?.innerHTML as string;

      /* create HTML of the link */
      const linkHTML: string = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into html variable */
      html = html + linkHTML;

    }

    /* add all the links from html variable to titleList */
    titleList.insertAdjacentHTML('afterbegin', html);

    /* find created links and add listeners to them */
    const links = document.querySelectorAll('.titles a') as NodeListOf<HTMLLinkElement>;
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }


  const generateTags = (): void => {

    /* create a new array for holding unique tag names */
    const allTags: string[] = [];

    /* find all articles and loop through */
    const articles = document.querySelectorAll(selectorArticle) as NodeListOf<HTMLElement>;
    for (let article of articles) {

      /* find div for storing tags  */
      const tagWrapper = article.querySelector(selectorArticleTags) as HTMLUListElement;

          /* prepare variable for storing all the tag links */
      let html: string = '';

      /* get info about tags from data-tags attribute */
      const dataTag = article.getAttribute('data-tags') as string;

      /* split tags into array */
      const tagsArray: string[] = dataTag.split(' ');

      /* loop through tags */
      for (let tag of tagsArray) {
        /* generate HTML of the link */
        const linkHTML: string = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html = html + linkHTML;

        /* check if tag is NOT already in allTags, if not -> push it */
        if (!allTags.includes(tag)) {
          allTags.push(tag)
        }

      }
      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.insertAdjacentHTML('afterbegin', html);

    }

    /* find tags list in sidebar */
    const tagList = document.querySelector(selectorTagsList) as HTMLUListElement;

    /* create variable for all links */
    let allTagsHTML: string = '';

    /* loop for each tag in unique tags list */
    for (let tag of allTags) {
      allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
    }

    /* add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  const generateAuthors = (): void => {

    /* create list of unique authors */
    let allAuthors: string[] = [];

    /* find all articles and loop through */
    const articles = document.querySelectorAll(selectorArticle) as NodeListOf<HTMLElement>;
    for (let article of articles) {

      /* find wrapper for author in article elem */
      const articleAuthor = article.querySelector(selectorArticleAuthor) as HTMLElement;

      /* get article data-author attribute */
      const author = article.getAttribute('data-author') as string;

      /* check if author is not already in the list, if not -> push it */
      if (!allAuthors.includes(author)) {
        allAuthors.push(author)
      }

      /* create author link and add it  to article */
      const html: string = 'by <a href="#author-' + author + '">' + author + '</a>'
      articleAuthor.insertAdjacentHTML('beforeend', html);
    }

    /* find wrapper for author links in sidebar */
    const authorList = document.querySelector(selectorAuthorsList) as HTMLUListElement;

    /* loop through unique authors and generate author links in in sidebar*/
    for (let author of allAuthors) {
      authorList.insertAdjacentHTML('afterbegin', '<li><a href="#">' + author  + '</a></li>');
    }

  }

  // generate title links, tags and author based on articles */
  generateTitleLinks();
  generateTags();
  generateAuthors();

}
