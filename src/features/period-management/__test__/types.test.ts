import { describe, it, expect } from 'vitest';
import { AcademicPeriod, SemesterType, AcademicState } from '../types';

describe('Period Types and Enums', () => {
  describe('SemesterType Enum', () => {
    it('should have correct semester type values', () => {
      expect(SemesterType.GANJIL).toBe('GANJIL');
      expect(SemesterType.GANJIL_PENDEK).toBe('GANJIL PENDEK');
      expect(SemesterType.GENAP).toBe('GENAP');
      expect(SemesterType.GENAP_PENDEK).toBe('GENAP PENDEK');
    });

    it('should have all required semester types', () => {
      const semesterTypes = Object.values(SemesterType);
      expect(semesterTypes).toContain('GANJIL');
      expect(semesterTypes).toContain('GANJIL PENDEK');
      expect(semesterTypes).toContain('GENAP');
      expect(semesterTypes).toContain('GENAP PENDEK');
    });
  });

  describe('AcademicState Enum', () => {
    it('should have correct academic state values', () => {
      expect(AcademicState.PLANNING).toBe('PLANNING');
      expect(AcademicState.ONGOING).toBe('ONGOING');
      expect(AcademicState.CLOSE).toBe('CLOSE');
    });

    it('should have all required academic states', () => {
      const academicStates = Object.values(AcademicState);
      expect(academicStates).toContain('PLANNING');
      expect(academicStates).toContain('ONGOING');
      expect(academicStates).toContain('CLOSE');
    });
  });

  describe('AcademicPeriod Interface', () => {
    it('should have correct properties', () => {
      const period: AcademicPeriod = {
        id: 'test-id',
        year: 2025,
        semester_type: SemesterType.GANJIL,
        academic_state: AcademicState.ONGOING,
        created_at: new Date(),
        updated_at: new Date(),
      };

      expect(period).toHaveProperty('id');
      expect(period).toHaveProperty('year');
      expect(period).toHaveProperty('semester_type');
      expect(period).toHaveProperty('academic_state');
      expect(period).toHaveProperty('created_at');
      expect(period).toHaveProperty('updated_at');
    });

    it('should validate id as string', () => {
      const period: AcademicPeriod = {
        id: 'valid-id-123',
        year: 2025,
        semester_type: SemesterType.GANJIL,
        academic_state: AcademicState.ONGOING,
        created_at: new Date(),
        updated_at: new Date(),
      };

      expect(typeof period.id).toBe('string');
    });

    it('should validate year as number', () => {
      const period: AcademicPeriod = {
        id: 'test-id',
        year: 2025,
        semester_type: SemesterType.GANJIL,
        academic_state: AcademicState.ONGOING,
        created_at: new Date(),
        updated_at: new Date(),
      };

      expect(typeof period.year).toBe('number');
    });

    it('should validate semester_type as enum value', () => {
      const validTypes = [
        SemesterType.GANJIL,
        SemesterType.GANJIL_PENDEK,
        SemesterType.GENAP,
        SemesterType.GENAP_PENDEK,
      ];

      validTypes.forEach((type) => {
        const period: AcademicPeriod = {
          id: 'test-id',
          year: 2025,
          semester_type: type,
          academic_state: AcademicState.ONGOING,
          created_at: new Date(),
          updated_at: new Date(),
        };

        expect(validTypes).toContain(period.semester_type);
      });
    });

    it('should validate academic_state as enum value', () => {
      const validStates = [
        AcademicState.PLANNING,
        AcademicState.ONGOING,
        AcademicState.CLOSE,
      ];

      validStates.forEach((state) => {
        const period: AcademicPeriod = {
          id: 'test-id',
          year: 2025,
          semester_type: SemesterType.GANJIL,
          academic_state: state,
          created_at: new Date(),
          updated_at: new Date(),
        };

        expect(validStates).toContain(period.academic_state);
      });
    });

    it('should validate dates as Date objects', () => {
      const now = new Date();
      const period: AcademicPeriod = {
        id: 'test-id',
        year: 2025,
        semester_type: SemesterType.GANJIL,
        academic_state: AcademicState.ONGOING,
        created_at: now,
        updated_at: now,
      };

      expect(period.created_at instanceof Date).toBe(true);
      expect(period.updated_at instanceof Date).toBe(true);
    });
  });

  describe('Type Variations', () => {
    it('should support all semester type combinations with academic states', () => {
      const semesterTypes = Object.values(SemesterType);
      const academicStates = Object.values(AcademicState);

      semesterTypes.forEach((semester) => {
        academicStates.forEach((state) => {
          const period: AcademicPeriod = {
            id: 'test-id',
            year: 2025,
            semester_type: semester as SemesterType,
            academic_state: state as AcademicState,
            created_at: new Date(),
            updated_at: new Date(),
          };

          expect(period.semester_type).toBe(semester);
          expect(period.academic_state).toBe(state);
        });
      });
    });
  });
});
