# Architecture
```mermaid
graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[iPhone]
  C -->|Three| F[fa:fa-car Car]
```

```mermaid
graph TD
  A[Renderer]
  B[Physics]
  C[Collision]
```

# TODO
- What order should game run things in?
    - e.g. Collision detection before update?
- Recommended state management approach?
- Add optional render for spatial hashmap
- Update engine to use percentages by default
    - Why? To support arbitrary resolution, easier debugging, intuitive coordinates
