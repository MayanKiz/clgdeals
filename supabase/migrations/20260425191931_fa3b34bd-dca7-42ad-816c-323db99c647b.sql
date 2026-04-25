UPDATE storage.buckets
SET public = false
WHERE id = 'marketplace-photos';

DROP POLICY IF EXISTS "Marketplace photos are public" ON storage.objects;

CREATE POLICY "Authenticated users can view marketplace photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'marketplace-photos');