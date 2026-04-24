# Troubleshooting — dev-query-platform

## Bun Monorepo : `bun --filter` — "No packages matched the filter"

### Problème 1 : Mauvais ordre des arguments

**Symptôme :**
```
error: No packages matched the filter
```

**Cause :**
L'ordre des arguments est incorrect. `--filter` doit être placé entre `bun` et `run`, pas après `bun run`.

```bash
# ❌ Incorrect
bun run --filter api dev

# ✅ Correct
bun --filter api run dev
```

**Solution :**
Toujours respecter la syntaxe : `bun --filter <nom> run <script>`

---

### Problème 2 : Script `dev` manquant dans `apps/api/package.json`

**Symptôme :**
```
[API] error: No packages matched the filter
[API] error: script "dev:api" exited with code 1
```

**Cause :**
Le `package.json` de NestJS ne génère pas de script `dev` par défaut. Il fournit `start:dev` à la place. Bun ne trouve donc pas de script `dev` à exécuter dans `apps/api`, même si le workspace est correctement détecté.

**Solution :**
Ajouter un script `dev` dans `apps/api/package.json` qui pointe vers `nest start --watch` :

```json
// apps/api/package.json
{
  "scripts": {
    "dev": "nest start --watch",
    "start:dev": "nest start --watch"
  }
}
```

---

## Scripts racine recommandés

```json
// package.json (racine)
{
  "scripts": {
    "dev": "concurrently -n \"API,WEB\" -c \"magenta,cyan\" \"bun run dev:api\" \"bun run dev:web\"",
    "dev:api": "bun --filter api run dev",
    "dev:web": "bun --filter web run dev"
  }
}
```

> **Note :** `bun --filter` matche le champ `name` du `package.json` du workspace, pas le chemin du dossier.
> Vérifier les noms exacts avec `bun pm ls` depuis la racine.
