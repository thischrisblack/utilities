// Netlify image transformation "nf_resize=<x>" values
export enum ImageTransformations {
    Fit = 'fit',
    Smartcrop = 'smartcrop',
}

/**
 * Provides absolute path for img src if using Netlify Large Media and image
 * transformations with NextJS. Returns Netlify server root URL so that
 * transformations will still work while developing on localhost.
 * NOTE: This will not work with images added since your last commit & push.
 * @param path              Relative path, i.e. "images/image.jpg"
 * @param transformation    The Netlify transformation to apply
 * @param w                 Desired image width
 * @param h                 Desired image height
 */
export const getAbsoluteImageUrl = (
    path: string,
    transformation?: string,
    w?: number,
    h?: number
): string => {
    // Set root URL
    const rootUrl = process.env.ROOT_IMG_URL || '';

    // If no transformation.
    if (!transformation) {
        // Return URL without transform.
        return `${rootUrl}${path}`;
    }

    // If transformation provided, but missing arguments.
    if (transformation && !w && !h) {
        console.error(
            'Missing required width or height arguments. Transform aborted.'
        );
        // Return URL without transform.
        return `${rootUrl}${path}`;
    }

    // If smartcrop transformation provided, but missing arguments.
    if (transformation === ImageTransformations.Smartcrop && (!w || !h)) {
        console.error(
            'Netlify smartcrop requires both width and height arguments. Transform aborted.'
        );
        // Return URL without transform.
        return `${rootUrl}${path}`;
    }

    // Build query string
    const imageTransformQueryString =
        `?nf_resize=${transformation}` +
        (w ? `&w=${w}` : '') +
        (h ? `&h=${h}` : '');

    // Return full URL with query string.
    return `${rootUrl}${path}${imageTransformQueryString}`;
};