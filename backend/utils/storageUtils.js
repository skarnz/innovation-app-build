const supabase = require('../config/supabaseClient');

const USER_ASSETS_BUCKET = 'user-assets';
const INTERNAL_DOCS_BUCKET = 'internal-docs';

/**
 * Uploads a file buffer to the user assets Supabase Storage bucket.
 * @param {Buffer} fileBuffer The file content as a buffer.
 * @param {string} fileName The desired unique filename (including path, e.g., userId/projectId/file.png).
 * @param {string} contentType The MIME type of the file (e.g., 'image/png').
 * @returns {Promise<{ data: object | null, error: Error | null }>} Supabase upload result.
 */
async function uploadAsset(fileBuffer, fileName, contentType) {
  if (!supabase) {
    console.error('Supabase client not initialized.');
    return { data: null, error: new Error('Supabase client not initialized.') };
  }
  try {
    const { data, error } = await supabase.storage
      .from(USER_ASSETS_BUCKET)
      .upload(fileName, fileBuffer, {
        contentType: contentType,
        upsert: true, // Overwrite if file exists
      });
    return { data, error };
  } catch (err) {
    console.error('Error uploading asset to Supabase:', err);
    return { data: null, error: err };
  }
}

/**
 * Gets the public URL for an asset in the user assets bucket.
 * Assumes the bucket has public read access configured or uses signed URLs if private.
 * @param {string} fileName The full path/filename in the bucket.
 * @param {number} expiresInSeconds Optional: Duration for signed URL validity (if bucket is private).
 * @returns {Promise<{ publicUrl: string | null, signedUrl: string | null, error: Error | null }>} Object containing URL(s) or error.
 */
async function getAssetUrl(fileName, expiresInSeconds = 60 * 60) { // Default signed URL expiry: 1 hour
  if (!supabase) {
    console.error('Supabase client not initialized.');
    return { publicUrl: null, signedUrl: null, error: new Error('Supabase client not initialized.') };
  }
  try {
    // Try getting public URL first (simpler if bucket is public)
    const { data: publicUrlData } = supabase.storage
      .from(USER_ASSETS_BUCKET)
      .getPublicUrl(fileName);

    // If the bucket policy requires signed URLs, publicUrl.publicUrl might be the base storage URL + filename,
    // but access might still fail. So, we generate a signed URL regardless for robustness if needed.
    // Check if the bucket is configured for public access, if not, generate signed URL
    // NOTE: This check logic might need refinement based on actual Supabase bucket config.
    // For now, we'll return both possibilities if generation succeeds.

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(USER_ASSETS_BUCKET)
      .createSignedUrl(fileName, expiresInSeconds);

    if (signedUrlError) {
      // If signed URL fails, maybe public is intended?
      console.warn(`Could not create signed URL for ${fileName}: ${signedUrlError.message}. Returning public URL attempt.`);
      return { publicUrl: publicUrlData?.publicUrl || null, signedUrl: null, error: null };
    }

    return {
        publicUrl: publicUrlData?.publicUrl || null,
        signedUrl: signedUrlData?.signedUrl || null,
        error: null
    };

  } catch (err) {
    console.error(`Error getting URL for asset ${fileName}:`, err);
    return { publicUrl: null, signedUrl: null, error: err };
  }
}

/**
 * Retrieves the content of an internal document from Supabase Storage.
 * @param {string} docName The filename in the internal-docs bucket.
 * @returns {Promise<{ data: Blob | null, error: Error | null }>} Supabase download result.
 */
async function getInternalDoc(docName) {
  if (!supabase) {
    console.error('Supabase client not initialized.');
    return { data: null, error: new Error('Supabase client not initialized.') };
  }
  try {
    const { data, error } = await supabase.storage
      .from(INTERNAL_DOCS_BUCKET)
      .download(docName);
    // Data will be a Blob, needs conversion to text/buffer if needed
    return { data, error };
  } catch (err) {
    console.error(`Error downloading internal doc ${docName}:`, err);
    return { data: null, error: err };
  }
}


module.exports = {
  uploadAsset,
  getAssetUrl,
  getInternalDoc,
}; 