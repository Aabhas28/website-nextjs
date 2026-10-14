# Mactus route inventory

Reference: `https://mactus.co.in/`  
Status legend: `Inspected` means reviewed in the reference browser; `Implemented, visual QA pending` means a route-specific local layout/content pass exists but a same-viewport local screenshot comparison has not been completed. No route is marked fully verified.

| Original URL | Local route | Page type / observed content sections | Status |
|---|---|---|---|
| `/` | `/` | Home: hero, minerals, choose Mactus, ventures, testimonials, applications | Inspected; visual QA pending |
| `/company-profile` | `/company-profile` | Company-profile banner; logo and company summary; benefits; partner section | Inspected; route-specific implementation added; visual QA pending |
| `/achievement` | `/achievement` | Achievement title and mineral-processing achievements | Inspected; route-specific implementation added; visual QA pending |
| `/quality` | `/quality` | Quality Assurance; R&D and laboratory instruments | Inspected; route-specific implementation added; visual QA pending |
| `/plant-photos` | `/plant-photos` | Plant-photo gallery | Inspected; original gallery assets identified; visual QA pending |
| `/client` | `/client` | Clients banner and 18-client logo grid | Inspected; exact banner and logos copied locally; visual QA pending |
| `/export` | `/export` | Export introduction and “Exporting to various Places Like” | Inspected; route-specific implementation added; visual QA pending |
| `/catalogue` | `/catalogue` | Catalogue / manufacturer information and catalogue download | Inspected; route-specific implementation added; visual QA pending |
| `/blog` | `/blog` | News & Blog card listing (56 entries observed, with dates, links, and thumbnails) | Listing inspected; titles/dates and corresponding reference thumbnails implemented; visual QA pending |
| `/blog-detail/{slug}` | `/blog-detail/{slug}` | Article title, hero image, article body, related/latest articles, inquiry form | First article inspected and partially transcribed; remaining 55 article bodies require per-route inspection; not complete |
| `/social-media` | `/social-media` | Social Media and Instagram feed status | Inspected; route-specific implementation added; visual QA pending |
| `/event` | `/event` | News & Events listing (36 entries observed, with event thumbnails) | Listing inspected; titles, links, and thumbnails implemented; visual QA pending |
| `/event-detail/{slug}` | `/event-detail/{slug}` | Event detail pages | 36 detail destinations observed; first event body inspected/transcribed; remaining 35 event bodies require per-route inspection; not complete |
| `/contact` | `/contact` | Contact details, map, inquiry form, 350-character counter and human-check control | Inspected; existing form-to-Excel behavior retained; visual QA pending |
| `/product/soda-feldspar` | same | Product detail, Properties / Technical Specification / Packing Sizes / Key Features tabs, applications | Inspected; visual QA pending |
| `/product/potash-feldspar` | same | Product detail, four tabs, applications and specs | Inspected; visual QA pending |
| `/product/talc` | same | Product detail, four tabs, applications | Inspected; visual QA pending |
| `/product/china-clay` | same | Product detail, four tabs, applications and specs | Inspected; visual QA pending |
| `/product/quartz` | same | Product detail, four tabs, applications | Inspected; visual QA pending |
| `/product/ball-clay` | same | Product detail, four tabs, applications | Inspected; visual QA pending |
| `/product/mica` | same | Product detail, four tabs, applications | Inspected; visual QA pending |
| `/uploads/catalogue/MACTUS_MINERAL_LLP.pdf` | asset/PDF | Downloadable catalogue | Link observed; local asset verification pending |

The original site also exposes `/includes/download.php`; it is a download endpoint rather than a normal page and has not been replicated as a local route. Blog/event detail pages are represented by route patterns here; all 56 blog listing titles and 36 event listing titles/slugs were captured, but most detail-page bodies remain untranscribed.
