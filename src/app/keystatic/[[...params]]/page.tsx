/**
 * Catch-all route for the Keystatic admin UI.
 *
 * Accessible at /keystatic, /keystatic/collection/<slug>, etc. — the
 * admin manages its own internal routing under this prefix.
 */

import KeystaticApp from "../keystatic";

export default function KeystaticPage() {
  return <KeystaticApp />;
}
