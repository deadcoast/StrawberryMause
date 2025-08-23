// Abstract Syntax Tree for module structure
interface MAUSModule {
  ast: {
    type: 'MODULE';
    signature: string;
    nodes: [
      {
        id: string;
        type: 'DOCUMENT' | 'FUNCTION' | 'DATA';
        weight: number; // Token cost
        hash: string; // Content hash
        edges: string[]; // Connections
        metadata: {
          lastModified: string;
          accessFrequency: number;
          criticalPath: boolean;
        };
      },
    ];
    edges: [
      {
        from: string;
        to: string;
        weight: number; // Relationship strength
        type: 'DEPENDS' | 'EXTENDS' | 'IMPLEMENTS' | 'REFERENCES';
      },
    ];
  };
}
