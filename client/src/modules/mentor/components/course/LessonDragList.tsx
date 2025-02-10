// components/LessonsList.tsx
interface LessonsListProps {
  control: Control<FormInputs>;
  lessons: Lesson[];
  fields: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onDragEnd: (result: DropResult) => void;
  register: any;
  errors: FieldErrors<FormInputs>;
}

export const LessonsList: React.FC<LessonsListProps> = ({
  control,
  lessons,
  fields,
  onAdd,
  onRemove,
  onDragEnd,
  register,
  errors,
}) => (
  <div className="space-y-4">
    <label className="block text-sm font-medium text-purple-700">Lessons</label>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lessons">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {fields.map((field, index) => (
              <DraggableLesson
                key={field.id}
                field={field}
                index={index}
                lessons={lessons}
                onRemove={() => onRemove(index)}
                register={register}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <AddLessonButton onAdd={onAdd} />
    <LessonErrors errors={errors} fields={fields} />
  </div>
);
