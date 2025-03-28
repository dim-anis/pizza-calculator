import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  FileText,
  Folder,
  FolderEdit,
  Github,
  Loader2,
  LucideProps,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  PenSquare,
  Plus,
  Search,
  Trash2,
  X,
  Printer,
  Bookmark,
  Apple,
  CircleCheck,
} from "lucide-react";

export const Icons = {
  loader: Loader2,
  alert: AlertCircle,
  success: CircleCheck,
  panelOpen: PanelLeftOpen,
  panelClose: PanelLeftClose,
  check: Check,
  search: Search,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  circle: Circle,
  close: X,
  folder: Folder,
  file: FileText,
  recipeEdit: PenSquare,
  folderEdit: FolderEdit,
  trash: Trash2,
  more: MoreHorizontal,
  add: Plus,
  github: Github,
  print: Printer,
  bookmark: Bookmark,
  apple: Apple,
  google: ({ ...props }: LucideProps) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
  logo: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <g>
        <path
          fill="currentColor"
          d="M436.948,75.059C388.559,26.657,324.311,0,255.98,0c-68.276,0-132.532,26.657-180.92,75.059
		C26.65,123.454,0,187.709,0,256s26.65,132.545,75.059,180.934C123.448,485.343,187.696,512,256.007,512l0.02-2.103
		c0,0,0.007,2.103,0.014,2.103c68.27,0,132.518-26.657,180.9-75.066C485.35,388.545,512.014,324.291,512,256
		C512.014,187.709,485.357,123.454,436.948,75.059z M419.293,419.293c-43.696,43.681-101.689,67.749-163.286,67.756
		c-61.604-0.007-119.591-24.075-163.3-67.756C49.026,375.597,24.965,317.604,24.951,256c0.014-61.604,24.075-119.598,67.756-163.3
		c43.709-43.681,101.696-67.742,163.3-67.749c61.59,0.007,119.584,24.068,163.286,67.749c43.688,43.702,67.756,101.696,67.756,163.3
		C487.049,317.604,462.982,375.597,419.293,419.293z"
        />
        <path
          fill="currentColor"
          d="M256.007,69.53c-102.984,0-186.47,83.486-186.47,186.47s83.486,186.47,186.47,186.47
		c102.984,0,186.47-83.486,186.47-186.47S358.991,69.53,256.007,69.53z M327.586,137.368l0.686,32.946l-14.798,0.309l-0.685-32.946
		L327.586,137.368z M149.954,330.34c-11.455,0-20.744-9.29-20.744-20.745c0-11.462,9.29-20.744,20.744-20.744
		s20.744,9.283,20.744,20.744C170.698,321.05,161.409,330.34,149.954,330.34z M162.834,237.947l-33.816-17.264l7.865-15.401
		l33.816,17.271L162.834,237.947z M223.136,121.728c15.593,0,28.24,12.64,28.24,28.24c0,15.593-12.647,28.24-28.24,28.24
		c-15.592,0-28.24-12.647-28.24-28.24C194.896,134.368,207.543,121.728,223.136,121.728z M235.234,397.63l-32.323-6.399
		l2.878-14.518l32.323,6.398L235.234,397.63z M240.428,312.48c-9.55,0-17.292-7.742-17.292-17.292
		c0-9.543,7.742-17.284,17.292-17.284c9.55,0,17.292,7.742,17.292,17.284C257.72,304.738,249.978,312.48,240.428,312.48z
		 M325.147,376.446c-14.003,0-25.363-11.352-25.363-25.362c0-14.003,11.36-25.356,25.363-25.356
		c14.003,0,25.348,11.352,25.348,25.356C350.495,365.095,339.15,376.446,325.147,376.446z M337.821,251.965
		c-14.003,0-25.362-11.352-25.362-25.356c0-14.004,11.359-25.355,25.362-25.355c14.004,0,25.362,11.352,25.362,25.355
		C363.183,240.612,351.825,251.965,337.821,251.965z M366.266,307.266l-6.564-12.688l28.254-14.627l6.577,12.695L366.266,307.266z"
        />
      </g>
    </svg>
  ),
};
