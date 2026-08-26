// response.js — consistent JSON response shape helpers
function ok(res, data, meta = undefined) {
  return res.status(200).json({ success: true, data, ...(meta ? { meta } : {}) });
}

function created(res, data) {
  return res.status(201).json({ success: true, data });
}

function noContent(res) {
  return res.status(204).send();
}

module.exports = { ok, created, noContent };
