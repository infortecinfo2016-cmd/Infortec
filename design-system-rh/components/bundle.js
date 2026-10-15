/* @ds-bundle: {"format":4,"namespace":"InfortecRH","components":[{"name":"Button"},{"name":"Icon"},{"name":"TextField"},{"name":"Select"},{"name":"Checkbox"},{"name":"Switch"},{"name":"StatusBadge"},{"name":"Avatar"},{"name":"Alert"},{"name":"Tabs"},{"name":"StatCard"},{"name":"EmployeeCard"},{"name":"DataTable"},{"name":"RequestCard"},{"name":"Timesheet"},{"name":"SideNav"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState;
  var useId = React.useId || function () { var r = React.useRef(null); if (!r.current) r.current = 'irh-' + Math.random().toString(36).slice(2, 8); return r.current; };

  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  /* Ícones: traço 1.75px, grade 24px, desenhados para o Infortec RH. */
  var ICONS = {
    home: [['path', { d: 'M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z' }]],
    users: [['circle', { cx: 9, cy: 8, r: 3.5 }], ['path', { d: 'M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5' }], ['path', { d: 'M15.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.9.8 3.1 2.6 3.5 5.2' }]],
    'user-plus': [['circle', { cx: 10, cy: 8, r: 3.5 }], ['path', { d: 'M3.5 20c.6-3.4 3.2-5.5 6.5-5.5 1.6 0 3 .5 4.1 1.4' }], ['path', { d: 'M19 14v6M16 17h6' }]],
    clock: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 7.5V12l3 2' }]],
    calendar: [['rect', { x: 3.5, y: 5, width: 17, height: 15, rx: 2 }], ['path', { d: 'M3.5 10h17M8 3v4M16 3v4' }]],
    wallet: [['rect', { x: 3, y: 6, width: 18, height: 13, rx: 2 }], ['path', { d: 'M3 10h18M16 14.5h2' }]],
    gift: [['rect', { x: 3.5, y: 9, width: 17, height: 11, rx: 1.5 }], ['path', { d: 'M12 9v11M3.5 13h17M12 9c-1.5-3.5-5-4-5-1.5S10 9 12 9c2 0 5-.5 5-1.5S13.5 5.5 12 9' }]],
    star: [['path', { d: 'm12 4 2.4 5 5.3.6-3.9 3.7 1 5.3L12 16l-4.8 2.6 1-5.3-3.9-3.7 5.3-.6z' }]],
    chart: [['path', { d: 'M4 20h16M7 16v-4M12 16V7M17 16v-7' }]],
    file: [['path', { d: 'M7 3.5h7l4.5 4.5v11.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z' }], ['path', { d: 'M14 3.5V8h4.5M9 13h6M9 16.5h4' }]],
    check: [['path', { d: 'm5 12.5 4.5 4.5L19 7.5' }]],
    x: [['path', { d: 'M6 6l12 12M18 6 6 18' }]],
    plus: [['path', { d: 'M12 5v14M5 12h14' }]],
    search: [['circle', { cx: 11, cy: 11, r: 6.5 }], ['path', { d: 'm16 16 4 4' }]],
    filter: [['path', { d: 'M4 6h16M7 12h10M10 18h4' }]],
    download: [['path', { d: 'M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14' }]],
    bell: [['path', { d: 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5h4' }]],
    'chevron-right': [['path', { d: 'm9.5 6 6 6-6 6' }]],
    'chevron-down': [['path', { d: 'm6 9.5 6 6 6-6' }]],
    'arrow-up': [['path', { d: 'M12 19V5M6.5 10.5 12 5l5.5 5.5' }]],
    'arrow-down': [['path', { d: 'M12 5v14M6.5 13.5 12 19l5.5-5.5' }]],
    info: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 11v5.5M12 7.6v.2' }]],
    alert: [['path', { d: 'M12 4 21 19.5H3z' }], ['path', { d: 'M12 10v4.5M12 17v.2' }]],
    'check-circle': [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'm8 12.3 2.8 2.7L16 9.5' }]],
    'x-circle': [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'm9 9 6 6M15 9l-6 6' }]],
    logout: [['path', { d: 'M14 4.5H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h8M10 12h10M16.5 8.5 20 12l-3.5 3.5' }]]
  };

  function Icon(props) {
    var name = props.name, size = props.size || 20, label = props.label;
    var parts = ICONS[name] || ICONS.info;
    return h('svg', {
      className: cx('irh-icon', props.className), width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round',
      role: label ? 'img' : undefined, 'aria-label': label, 'aria-hidden': label ? undefined : true
    }, parts.map(function (p, i) { return h(p[0], Object.assign({ key: i }, p[1])); }));
  }
  Icon.names = Object.keys(ICONS);

  function Button(props) {
    var variant = props.variant || 'secondary', size = props.size || 'md';
    var rest = Object.assign({}, props);
    ['variant', 'size', 'icon', 'iconRight', 'loading', 'block', 'className', 'children'].forEach(function (k) { delete rest[k]; });
    var iconSize = size === 'sm' ? 16 : 18;
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: cx('irh-btn', 'irh-btn--' + variant, 'irh-btn--' + size, props.block && 'irh-btn--block', props.loading && 'is-loading', props.className),
      disabled: props.disabled || props.loading, 'aria-busy': props.loading || undefined
    }),
      props.loading ? h('span', { className: 'irh-spinner', 'aria-hidden': true }) : (props.icon ? h(Icon, { name: props.icon, size: iconSize }) : null),
      props.children != null ? h('span', null, props.children) : null,
      props.iconRight ? h(Icon, { name: props.iconRight, size: iconSize }) : null);
  }

  function Field(p, control) {
    return h('div', { className: cx('irh-field', p.error && 'is-invalid', p.className) },
      p.label ? h('label', { className: 'irh-field__label', htmlFor: p.id }, p.label, p.required ? h('span', { className: 'irh-field__req', 'aria-hidden': true }, ' *') : null) : null,
      control,
      p.error ? h('p', { className: 'irh-field__msg irh-field__msg--error', id: p.id + '-msg' }, h(Icon, { name: 'alert', size: 14 }), p.error)
        : p.hint ? h('p', { className: 'irh-field__msg', id: p.id + '-msg' }, p.hint) : null);
  }

  function TextField(props) {
    var auto = useId();
    var id = props.id || auto;
    var rest = Object.assign({}, props);
    ['label', 'hint', 'error', 'icon', 'mono', 'className', 'id', 'suffix'].forEach(function (k) { delete rest[k]; });
    return Field(Object.assign({}, props, { id: id }),
      h('div', { className: cx('irh-input', props.icon && 'has-icon', props.disabled && 'is-disabled') },
        props.icon ? h(Icon, { name: props.icon, size: 18, className: 'irh-input__icon' }) : null,
        h('input', Object.assign({ type: 'text' }, rest, {
          id: id, className: cx('irh-input__el', props.mono && 'irh-mono'),
          'aria-invalid': props.error ? true : undefined, 'aria-describedby': (props.error || props.hint) ? id + '-msg' : undefined
        })),
        props.suffix ? h('span', { className: 'irh-input__suffix' }, props.suffix) : null));
  }

  function Select(props) {
    var auto = useId();
    var id = props.id || auto;
    var rest = Object.assign({}, props);
    ['label', 'hint', 'error', 'options', 'placeholder', 'className', 'id'].forEach(function (k) { delete rest[k]; });
    var opts = (props.options || []).map(function (o) {
      var v = typeof o === 'string' ? { value: o, label: o } : o;
      return h('option', { key: v.value, value: v.value }, v.label);
    });
    if (props.placeholder) opts.unshift(h('option', { key: '__ph', value: '', disabled: true }, props.placeholder));
    return Field(Object.assign({}, props, { id: id }),
      h('div', { className: cx('irh-input', 'irh-select', props.disabled && 'is-disabled') },
        h('select', Object.assign({ defaultValue: props.value === undefined && props.placeholder ? '' : undefined }, rest, {
          id: id, className: 'irh-input__el',
          'aria-invalid': props.error ? true : undefined, 'aria-describedby': (props.error || props.hint) ? id + '-msg' : undefined
        }), opts),
        h(Icon, { name: 'chevron-down', size: 18, className: 'irh-select__chev' })));
  }

  function Checkbox(props) {
    var auto = useId();
    var id = props.id || auto;
    var rest = Object.assign({}, props);
    ['label', 'description', 'className', 'id'].forEach(function (k) { delete rest[k]; });
    return h('label', { className: cx('irh-check', props.disabled && 'is-disabled', props.className), htmlFor: id },
      h('input', Object.assign({ type: 'checkbox' }, rest, { id: id, className: 'irh-check__box' })),
      h('span', { className: 'irh-check__text' },
        h('span', { className: 'irh-check__label' }, props.label),
        props.description ? h('span', { className: 'irh-check__desc' }, props.description) : null));
  }

  function Switch(props) {
    var controlled = props.checked !== undefined;
    var st = useState(!!props.defaultChecked), inner = st[0], setInner = st[1];
    var on = controlled ? props.checked : inner;
    function toggle() {
      if (props.disabled) return;
      if (!controlled) setInner(!on);
      if (props.onChange) props.onChange(!on);
    }
    return h('button', {
      type: 'button', role: 'switch', 'aria-checked': on, disabled: props.disabled, onClick: toggle,
      className: cx('irh-switch', on && 'is-on', props.className)
    }, h('span', { className: 'irh-switch__track', 'aria-hidden': true }, h('span', { className: 'irh-switch__thumb' })),
      props.label ? h('span', { className: 'irh-switch__label' }, props.label) : null);
  }

  var STATUS = {
    ativo: ['success', 'Ativo'],
    experiencia: ['people', 'Em experiência'],
    admissao: ['brand', 'Em admissão'],
    ferias: ['leave', 'Em férias'],
    licenca: ['leave', 'Licença'],
    afastado: ['neutral', 'Afastado'],
    desligado: ['neutral', 'Desligado'],
    pendente: ['warning', 'Pendente'],
    analise: ['warning', 'Em análise'],
    aprovado: ['success', 'Aprovado'],
    recusado: ['danger', 'Recusado'],
    atraso: ['danger', 'Atraso'],
    falta: ['danger', 'Falta'],
    regular: ['success', 'Regular']
  };

  function StatusBadge(props) {
    var def = STATUS[props.status] || [props.tone || 'neutral', ''];
    var tone = props.tone || def[0];
    return h('span', { className: cx('irh-badge', 'irh-badge--' + tone, props.size === 'sm' && 'irh-badge--sm', props.className) },
      h('span', { className: 'irh-badge__dot', 'aria-hidden': true }),
      props.children != null ? props.children : def[1]);
  }
  StatusBadge.statuses = Object.keys(STATUS);

  var AVATAR_TONES = ['brand', 'people', 'leave'];
  function initials(name) {
    var parts = String(name || '?').trim().split(/\s+/).filter(function (w) { return !/^(da|de|do|das|dos|e)$/i.test(w); });
    return ((parts[0] || '?')[0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  }
  function Avatar(props) {
    var name = props.name || '';
    var hash = 0;
    for (var i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
    var tone = props.tone || AVATAR_TONES[Math.abs(hash) % AVATAR_TONES.length];
    return h('span', { className: cx('irh-avatar', 'irh-avatar--' + (props.size || 'md'), 'irh-avatar--' + tone, props.className), title: name },
      props.src ? h('img', { src: props.src, alt: name }) : h('span', { 'aria-hidden': true }, initials(name)),
      props.src ? null : h('span', { className: 'irh-sr' }, name),
      props.status ? h('span', { className: 'irh-avatar__presence irh-avatar__presence--' + props.status, 'aria-hidden': true }) : null);
  }

  var ALERT_ICON = { info: 'info', success: 'check-circle', warning: 'alert', danger: 'x-circle' };
  function Alert(props) {
    var tone = props.tone || 'info';
    return h('div', { className: cx('irh-alert', 'irh-alert--' + tone, props.className), role: tone === 'danger' ? 'alert' : 'status' },
      h(Icon, { name: ALERT_ICON[tone], size: 20, className: 'irh-alert__icon' }),
      h('div', { className: 'irh-alert__body' },
        props.title ? h('p', { className: 'irh-alert__title' }, props.title) : null,
        props.children ? h('div', { className: 'irh-alert__text' }, props.children) : null),
      props.action ? h('div', { className: 'irh-alert__action' }, props.action) : null,
      props.onClose ? h('button', { type: 'button', className: 'irh-alert__close', onClick: props.onClose, 'aria-label': 'Fechar aviso' }, h(Icon, { name: 'x', size: 16 })) : null);
  }

  function Tabs(props) {
    var items = props.items || [];
    var st = useState(props.defaultValue || (items[0] && items[0].id)), inner = st[0], setInner = st[1];
    var value = props.value !== undefined ? props.value : inner;
    function pick(id) { if (props.value === undefined) setInner(id); if (props.onChange) props.onChange(id); }
    function onKey(e) {
      var i = items.findIndex(function (t) { return t.id === value; });
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        var n = items[(i + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length];
        pick(n.id);
        var btn = e.currentTarget.querySelector('[data-tab="' + n.id + '"]'); if (btn) btn.focus();
      }
    }
    return h('div', { className: cx('irh-tabs', props.className), role: 'tablist', 'aria-label': props.label, onKeyDown: onKey },
      items.map(function (t) {
        var sel = t.id === value;
        return h('button', { key: t.id, type: 'button', role: 'tab', 'data-tab': t.id, 'aria-selected': sel, tabIndex: sel ? 0 : -1, className: cx('irh-tab', sel && 'is-selected'), onClick: function () { pick(t.id); } },
          t.label, t.count != null ? h('span', { className: 'irh-tab__count' }, t.count) : null);
      }));
  }

  function StatCard(props) {
    var trend = props.trend || 'flat';
    var good = props.goodWhen || 'up';
    var tone = trend === 'flat' ? 'neutral' : (trend === good ? 'good' : 'bad');
    return h('div', { className: cx('irh-card', 'irh-stat', props.className) },
      h('div', { className: 'irh-stat__head' },
        h('p', { className: 'irh-stat__label' }, props.label),
        props.icon ? h('span', { className: 'irh-stat__icon' }, h(Icon, { name: props.icon, size: 18 })) : null),
      h('p', { className: 'irh-stat__value' }, props.value, props.unit ? h('span', { className: 'irh-stat__unit' }, props.unit) : null),
      props.delta ? h('p', { className: 'irh-stat__delta irh-stat__delta--' + tone },
        trend !== 'flat' ? h(Icon, { name: trend === 'up' ? 'arrow-up' : 'arrow-down', size: 14 }) : null,
        h('span', { className: 'irh-stat__delta-num' }, props.delta),
        props.deltaLabel ? h('span', { className: 'irh-stat__delta-label' }, props.deltaLabel) : null) : null);
  }

  function EmployeeCard(props) {
    return h('div', { className: cx('irh-card', 'irh-emp', props.onClick && 'is-clickable', props.className), onClick: props.onClick, tabIndex: props.onClick ? 0 : undefined },
      h('div', { className: 'irh-emp__top' },
        h(Avatar, { name: props.name, src: props.photo, size: 'lg' }),
        h('div', { className: 'irh-emp__who' },
          h('p', { className: 'irh-emp__name' }, props.name),
          h('p', { className: 'irh-emp__role' }, props.role)),
        props.status ? h(StatusBadge, { status: props.status, size: 'sm' }) : null),
      h('dl', { className: 'irh-emp__meta' },
        props.department ? h('div', null, h('dt', null, 'Departamento'), h('dd', null, props.department)) : null,
        props.registration ? h('div', null, h('dt', null, 'Matrícula'), h('dd', { className: 'irh-mono' }, props.registration)) : null,
        props.admission ? h('div', null, h('dt', null, 'Admissão'), h('dd', { className: 'irh-mono' }, props.admission)) : null,
        props.manager ? h('div', null, h('dt', null, 'Gestor(a)'), h('dd', null, props.manager)) : null));
  }

  function DataTable(props) {
    var cols = props.columns || [], rows = props.rows || [];
    var rowKey = props.rowKey || 'id';
    return h('div', { className: cx('irh-table-wrap', props.className) },
      h('table', { className: cx('irh-table', props.dense && 'irh-table--dense') },
        props.caption ? h('caption', { className: 'irh-sr' }, props.caption) : null,
        h('thead', null, h('tr', null, cols.map(function (c) {
          return h('th', { key: c.key, scope: 'col', className: c.align ? 'is-' + c.align : undefined, style: c.width ? { width: c.width } : undefined }, c.label);
        }))),
        h('tbody', null, rows.length ? rows.map(function (r, i) {
          return h('tr', { key: r[rowKey] != null ? r[rowKey] : i, className: props.onRowClick ? 'is-clickable' : undefined, onClick: props.onRowClick ? function () { props.onRowClick(r); } : undefined },
            cols.map(function (c) {
              return h('td', { key: c.key, className: cx(c.align && 'is-' + c.align, c.mono && 'irh-mono') }, c.render ? c.render(r) : r[c.key]);
            }));
        }) : h('tr', null, h('td', { colSpan: cols.length, className: 'irh-table__empty' }, props.empty || 'Nenhum registro encontrado.')))));
  }

  var REQUEST_ICON = { 'Férias': 'calendar', 'Banco de horas': 'clock', 'Atestado': 'file', 'Reembolso': 'wallet' };
  function RequestCard(props) {
    var status = props.status || 'pendente';
    return h('article', { className: cx('irh-card', 'irh-req', props.className) },
      h('header', { className: 'irh-req__head' },
        h('span', { className: 'irh-req__kind' }, h(Icon, { name: REQUEST_ICON[props.kind] || 'file', size: 16 }), props.kind || 'Solicitação'),
        h(StatusBadge, { status: status, size: 'sm' })),
      h('div', { className: 'irh-req__person' },
        h(Avatar, { name: props.name, size: 'md' }),
        h('div', null, h('p', { className: 'irh-req__name' }, props.name), h('p', { className: 'irh-req__role' }, props.role))),
      h('dl', { className: 'irh-req__facts' },
        props.period ? h('div', null, h('dt', null, 'Período'), h('dd', { className: 'irh-mono' }, props.period)) : null,
        props.amount ? h('div', null, h('dt', null, props.amountLabel || 'Quantidade'), h('dd', { className: 'irh-mono' }, props.amount)) : null),
      props.note ? h('p', { className: 'irh-req__note' }, '“' + props.note + '”') : null,
      status === 'pendente' && (props.onApprove || props.onReject) ? h('footer', { className: 'irh-req__actions' },
        h(Button, { variant: 'secondary', size: 'sm', icon: 'x', onClick: props.onReject }, 'Recusar'),
        h(Button, { variant: 'primary', size: 'sm', icon: 'check', onClick: props.onApprove }, 'Aprovar')) : null,
      props.submitted ? h('p', { className: 'irh-req__submitted' }, props.submitted) : null);
  }

  var DAY_FLAG = { falta: ['falta', null], ferias: ['ferias', 'Férias'], feriado: ['neutral', 'Feriado'], folga: ['neutral', 'Folga'] };
  function Timesheet(props) {
    var slots = props.slots || 4;
    var head = ['Dia'];
    for (var s = 0; s < slots; s++) head.push(s % 2 === 0 ? 'Entrada' : 'Saída');
    head.push('Trabalhado', 'Saldo');
    return h('div', { className: cx('irh-table-wrap', props.className) },
      h('table', { className: 'irh-table irh-table--dense irh-ts' },
        h('caption', { className: 'irh-sr' }, props.caption || 'Espelho de ponto'),
        h('thead', null, h('tr', null, head.map(function (t, i) { return h('th', { key: i, scope: 'col', className: i > 0 ? 'is-center' : undefined }, t); }))),
        h('tbody', null, (props.days || []).map(function (d, i) {
          var flag = d.flag && DAY_FLAG[d.flag];
          if (flag && flag[1]) {
            return h('tr', { key: i, className: 'irh-ts__off' },
              h('th', { scope: 'row' }, d.date),
              h('td', { colSpan: slots + 2, className: 'is-center' }, h(StatusBadge, flag[0] === 'ferias' ? { status: 'ferias', size: 'sm' } : { tone: 'neutral', size: 'sm' }, flag[1])));
          }
          var cells = [];
          for (var k = 0; k < slots; k++) {
            var p = d.punches && d.punches[k];
            cells.push(h('td', { key: k, className: cx('is-center', 'irh-mono', !p && 'irh-ts__miss') }, p || '--:--'));
          }
          var bal = d.balance || '00:00';
          var neg = bal.charAt(0) === '-', pos = bal.charAt(0) === '+';
          return h('tr', { key: i, className: d.flag === 'falta' ? 'irh-ts__absent' : undefined },
            h('th', { scope: 'row' }, d.date, d.flag === 'falta' ? h(StatusBadge, { status: 'falta', size: 'sm', className: 'irh-ts__flag' }) : null),
            cells,
            h('td', { className: 'is-center irh-mono' }, d.total || '--:--'),
            h('td', { className: cx('is-center', 'irh-mono', 'irh-ts__bal', neg && 'is-neg', pos && 'is-pos') }, bal));
        }))));
  }

  function SideNav(props) {
    var st = useState(props.defaultActive), inner = st[0], setInner = st[1];
    var active = props.active !== undefined ? props.active : inner;
    function pick(id) { if (props.active === undefined) setInner(id); if (props.onSelect) props.onSelect(id); }
    return h('nav', { className: cx('irh-nav', props.className), 'aria-label': 'Menu principal' },
      h('div', { className: 'irh-nav__brand' },
        props.logoSrc ? h('img', { src: props.logoSrc, alt: '', className: 'irh-nav__logo' }) : null,
        h('span', { className: 'irh-nav__product' }, 'Infortec', h('b', null, ' RH'))),
      h('div', { className: 'irh-nav__groups' }, (props.groups || []).map(function (g, gi) {
        return h('div', { key: gi, className: 'irh-nav__group' },
          g.title ? h('p', { className: 'irh-nav__title' }, g.title) : null,
          h('ul', null, g.items.map(function (it) {
            var on = it.id === active;
            return h('li', { key: it.id }, h('a', {
              href: it.href || '#' + it.id, className: cx('irh-nav__item', on && 'is-active'), 'aria-current': on ? 'page' : undefined,
              onClick: function (e) { if (!it.href) e.preventDefault(); pick(it.id); }
            }, h(Icon, { name: it.icon || 'chevron-right', size: 18 }), h('span', null, it.label),
              it.badge != null ? h('span', { className: 'irh-nav__badge' }, it.badge) : null));
          })));
      })),
      props.user ? h('div', { className: 'irh-nav__user' },
        h(Avatar, { name: props.user.name, size: 'sm', tone: 'people' }),
        h('div', null, h('p', { className: 'irh-nav__uname' }, props.user.name), h('p', { className: 'irh-nav__urole' }, props.user.role))) : null);
  }

  window.InfortecRH = Object.assign(window.InfortecRH || {}, {
    Button: Button, Icon: Icon, TextField: TextField, Select: Select, Checkbox: Checkbox, Switch: Switch,
    StatusBadge: StatusBadge, Avatar: Avatar, Alert: Alert, Tabs: Tabs, StatCard: StatCard,
    EmployeeCard: EmployeeCard, DataTable: DataTable, RequestCard: RequestCard, Timesheet: Timesheet, SideNav: SideNav
  });
})();
