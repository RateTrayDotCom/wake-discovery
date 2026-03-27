import * as admin from 'firebase-admin';

function getAdminApp() {
  if (!admin.apps.length) {
    const saString = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!saString || saString === '{}') {
      console.warn('FIREBASE_SERVICE_ACCOUNT is missing. Skipping admin initialization.');
      return null;
    }

    try {
      const serviceAccount = JSON.parse(saString);

      // Sanitize private key for PEM format
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }

      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
      });
    } catch (error) {
      console.error('Firebase admin initialization error', error);
      return null;
    }
  }
  return admin.app();
}

const app = getAdminApp();
export const adminDb = app ? app.firestore() : null as any;
export const adminAuth = app ? app.auth() : null as any;
