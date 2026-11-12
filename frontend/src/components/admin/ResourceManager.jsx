
import { useEffect, useState } from 'react';
import {
  createAdminResource,
  deleteAdminResource,
  getAdminResource,
  updateAdminResource
} from '../../services/api.js';

import './ResourceManager.css';

const fieldMap = {
  projects: [
    ['title', 'Title'],
    ['slug', 'Slug'],
    ['short_description', 'Short description'],
    ['full_description', 'Full description', 'textarea'],
    ['category', 'Category'],
    ['cover_image_url', 'Cover image URL'],
    ['technologies', 'Technologies (comma separated)'],
    ['github_url', 'GitHub URL'],
    ['live_demo_url', 'Live demo URL'],
    ['status', 'Status'],
    ['featured', 'Featured', 'checkbox'],
    ['published', 'Published', 'checkbox']
  ],

  skills: [
    ['name', 'Name'],
    ['description', 'Description'],
    ['learning_status', 'Learning status'],
    ['experience_level', 'Experience level', 'select'],
    ['logo_url', 'Logo URL']
  ],

  services: [
    ['title', 'Title'],
    ['slug', 'Slug'],
    ['description', 'Description', 'textarea'],
    ['technologies', 'Technologies (comma separated)'],
    ['active', 'Active', 'checkbox']
  ],

  experience: [
    ['role', 'Role'],
    ['organization', 'Organization'],
    ['employment_type', 'Type'],
    ['description', 'Description', 'textarea'],
    ['start_date', 'Start date'],
    ['end_date', 'End date']
  ],

  education: [
    ['institution', 'Institution'],
    ['qualification', 'Qualification'],
    ['field_of_study', 'Field of study'],
    ['description', 'Description', 'textarea'],
    ['start_date', 'Start date'],
    ['end_date', 'End date']
  ],

  certifications: [
    ['name', 'Name'],
    ['issuer', 'Issuer'],
    ['credential_url', 'Credential URL'],
    ['credential_id', 'Credential ID'],
    ['verified', 'Verified', 'checkbox']
  ],

  blog: [
    ['title', 'Title'],
    ['slug', 'Slug'],
    ['excerpt', 'Excerpt', 'textarea'],
    ['body', 'Article body', 'textarea'],
    ['featured_image_url', 'Featured image URL'],
    ['status', 'Status']
  ],

  testimonials: [
    ['person_name', 'Person name'],
    ['role_or_company', 'Role / company'],
    ['content', 'Feedback', 'textarea'],
    ['approved', 'Approved', 'checkbox']
  ],

  profile: [
    ['full_name', 'Full name'],
    ['professional_title', 'Professional title'],
    ['biography', 'Biography', 'textarea'],
    ['education_summary', 'Education summary'],
    ['profile_image_url', 'Profile image URL'],
    ['email', 'Email'],
    ['location', 'Location'],
    ['github_url', 'GitHub URL'],
    ['linkedin_url', 'LinkedIn URL'],
    ['instagram_url', 'Instagram URL'],
    ['availability_status', 'Availability']
  ],

  settings: [
    ['key', 'Setting key'],
    ['value', 'JSON value', 'textarea']
  ],

  enquiries: [],
  media: [],
  resume: [],

  seo: [
    ['key', 'Setting key'],
    ['value', 'JSON value', 'textarea']
  ]
};

const labelFor = {
  projects: 'Projects',
  skills: 'Skills',
  services: 'Services',
  experience: 'Experience',
  education: 'Education',
  certifications: 'Certifications',
  blog: 'Blog posts',
  testimonials: 'Testimonials',
  profile: 'Profile',
  settings: 'Website settings',
  enquiries: 'Contact enquiries',
  media: 'Media assets',
  resume: 'Resume versions',
  seo: 'SEO settings'
};

const requiredFields = [
  'title',
  'name',
  'slug',
  'role',
  'institution',
  'person_name',
  'full_name',
  'key'
];

export default function ResourceManager({
  resource,
  description = 'Manage your portfolio content.'
}) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const fields = fieldMap[resource] || [];

  const load = async () => {
    setLoading(true);
    setError('');

    try {
      const r = await getAdminResource(resource);
      setItems(r.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [resource]);

  const change = (key, value) => {
    setForm(current => ({
      ...current,
      [key]: value
    }));
  };

  const startEdit = item => {
    setEditing(item.id);

    const next = {};

    fields.forEach(([key]) => {
      next[key] = Array.isArray(item[key])
        ? item[key].join(', ')
        : (item[key] ?? '');
    });

    setForm(next);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const reset = () => {
    setEditing(null);
    setForm({});
  };

  const submit = async e => {
    e.preventDefault();

    setBusy(true);
    setError('');
    setNotice('');

    const payload = { ...form };

    fields.forEach(([key, , type]) => {
      if (type === 'checkbox') {
        payload[key] = Boolean(form[key]);
      }

      if (
        key === 'technologies' &&
        typeof form[key] === 'string'
      ) {
        payload[key] = form[key]
          .split(',')
          .map(value => value.trim())
          .filter(Boolean);
      }

      // Ensure experience_level matches the database constraint.
      if (key === 'experience_level') {
        payload[key] = String(form[key] || 'beginner').toLowerCase();
      }
    });

    try {
      if (editing) {
        await updateAdminResource(resource, editing, payload);
      } else {
        await createAdminResource(resource, payload);
      }

      setNotice(
        editing ? 'Changes saved.' : 'Item created.'
      );

      reset();
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async id => {
    if (!confirm('Delete this item permanently?')) {
      return;
    }

    try {
      await deleteAdminResource(resource, id);

      setNotice('Item deleted.');
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="resource-manager">

      <div className="resource-heading">
        <div>
          <span className="eyebrow">
            CONTENT MANAGEMENT
          </span>

          <h1>
            {labelFor[resource] || resource}
          </h1>

          <p>{description}</p>
        </div>

        <span className="resource-count">
          {items.length} records
        </span>
      </div>

      {fields.length > 0 && (
        <form
          className="resource-form"
          onSubmit={submit}
        >
          <h2>
            {editing ? 'Edit item' : 'Add new item'}
          </h2>

          <div className="resource-fields">

            {fields.map(([key, label, type]) => (
              <label key={key}>
                {label}

                {type === 'textarea' ? (
                  <textarea
                    rows="3"
                    value={form[key] ?? ''}
                    onChange={e =>
                      change(key, e.target.value)
                    }
                  />
                ) : type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={Boolean(form[key])}
                    onChange={e =>
                      change(key, e.target.checked)
                    }
                  />
                ) : type === 'select' ? (
                  <select
                    value={form[key] || 'beginner'}
                    onChange={e =>
                      change(key, e.target.value)
                    }
                  >
                    <option value="beginner">
                      Beginner
                    </option>

                    <option value="intermediate">
                      Intermediate
                    </option>

                    <option value="advanced">
                      Advanced
                    </option>
                  </select>
                ) : (
                  <input
                    value={form[key] ?? ''}
                    onChange={e =>
                      change(key, e.target.value)
                    }
                    required={requiredFields.includes(key)}
                  />
                )}
              </label>
            ))}

          </div>

          <div className="resource-actions">

            <button
              className="button"
              disabled={busy}
            >
              {busy
                ? 'Saving…'
                : editing
                  ? 'Save changes'
                  : 'Create item'}
            </button>

            {editing && (
              <button
                type="button"
                className="button button-ghost"
                onClick={reset}
              >
                Cancel
              </button>
            )}

          </div>
        </form>
      )}

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      {notice && (
        <p className="form-success">
          {notice}
        </p>
      )}

      <div className="resource-table-wrap">

        {loading ? (
          <p>Loading records…</p>
        ) : !items.length ? (
          <p className="muted">
            No records yet. Add your first item above.
          </p>
        ) : (
          <table className="resource-table">

            <thead>
              <tr>
                <th>Entry</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map(item => (
                <tr key={item.id || item.key}>

                  <td>
                    <strong>
                      {item.title ||
                        item.name ||
                        item.role ||
                        item.institution ||
                        item.person_name ||
                        item.full_name ||
                        item.key ||
                        item.subject ||
                        item.original_name ||
                        item.version_label ||
                        'Record'}
                    </strong>

                    <small>
                      {item.slug ||
                        item.email ||
                        item.status ||
                        item.learning_status ||
                        ''}
                    </small>
                  </td>

                  <td>
                    {(
                      item.short_description ||
                      item.description ||
                      item.excerpt ||
                      item.message ||
                      item.content ||
                      ''
                    ).slice(0, 140)}
                  </td>

                  <td>
                    <div className="row-actions">

                      {fields.length > 0 && (
                        <button
                          onClick={() => startEdit(item)}
                        >
                          Edit
                        </button>
                      )}

                      {item.id && (
                        <button
                          className="danger"
                          onClick={() => remove(item.id)}
                        >
                          Delete
                        </button>
                      )}

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}
